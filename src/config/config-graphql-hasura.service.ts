import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { ApiConfig, ConfigTypes } from './apiConfig';
import { GraphQLSchema } from 'graphql';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { GraphQLRequest } from 'apollo-link';
import { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } from 'graphql-tools';
import nodeFetch from 'node-fetch';
import { IncomingMessage } from 'http';

export interface IGraphlContext {
  req: IncomingMessage
}

export interface IPrevContext {
  graphqlContext: IGraphlContext
}

@Injectable()
export class ConfigGraphqlHasuraService implements GqlOptionsFactory  {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    let remoteExecutableSchema: any = null

    try {
      remoteExecutableSchema = await this.createRemoteSchema()
    } catch (e) {
      console.log(e)
    }

    return {
      autoSchemaFile: true,
      installSubscriptionHandlers: false,
      transformSchema: async (schema: GraphQLSchema) => {
        return mergeSchemas({
          schemas: [schema, remoteExecutableSchema],
        })
      },
      transformAutoSchemaFile: true,
      path: '/graphql',
      debug: true,
      tracing: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }
  }

  private async createRemoteSchema(): Promise<GraphQLSchema> {
    try {
      const httpLink = new HttpLink({
        uri: this.config.get(ConfigTypes.HASURA_GRAPHQL_URI),
        fetch: nodeFetch as any,
      })

      /**
       * HttpLink with Hasura admin secret set, allows access to all hasura resources.
       *
       * We only use this for server-to-server access in order to build remote schema
       */
      const adminAccessLink = setContext(() => ({
        headers: {
          'x-hasura-admin-secret': this.config.get(
            ConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET,
          ),
        },
      })).concat(httpLink)

      /**
       *  This will trigger every time there is a graphql request through this server to hasura
       *
       * we will use it to pass JWT to Hasura
       *
       * Issue with `setContext`
       *
       * https://github.com/apollographql/apollo-link/issues/630
       */
      const jwtAccessLink = setContext(
        (request: GraphQLRequest, prevContext: IPrevContext) => {
          const { authorization } = prevContext?.graphqlContext?.req?.headers
          return {
            ...prevContext,
            headers: authorization
              ? {
                Authorization: authorization,
              }
              : {},
          }
        },
      ).concat(httpLink)


      // First we get the schema using our hasura admin key
      const remoteIntrospectedSchema = await introspectSchema(adminAccessLink)

      /**
       * Need to be using graphql-tools@4 for stitching
       * Here we pass our JWT token to execute the queries that are
       * forwarded to Hasura through our server
       */
      const remoteExecutableSchema = makeRemoteExecutableSchema({
        schema: remoteIntrospectedSchema,
        link: jwtAccessLink,
      })

      return Promise.resolve(remoteExecutableSchema)
    } catch (err) {
      console.log(err)

      return Promise.reject(err)
    }
  }
}
