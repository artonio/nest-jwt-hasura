<p align="center">  
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>  
</p>  

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
   <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>  
    <p align="center">  
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>  
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>  
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>  
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>  
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>  
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>  
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>  
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>  
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>  
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>  
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>  
</p>  
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)  
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->  

## Description

[NestJS](https://github.com/nestjs/nest) project demonstrating the following features:

1. Hasura integration with [NestJS](https://github.com/nestjs/nest) via [GraphQL Schema Stitching](https://hasura.io/blog/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/#:~:text=Introduction-,Schema%20stitching%20is%20the%20process%20of%20creating%20a%20single,from%20multiple%20underlying%20GraphQL%20APIs.&text=You%20want%20to%20extend%20the,comes%20from%20another%20data%20source)
2. [Hasura JWT Authentication](https://hasura.io/docs/1.0/graphql/core/auth/authentication/jwt.html) and passing JWT to Hasura
3. TypeORM to design and seed Postgres DB used by Hasura
4. Admin role and Observer role which have different permission on different GraphQL Fields
5. Login with different users who have different roles with different permissions

## Installation

```bash  
$ npm install```  
  
## Running the app  
  
```bash  
# development  
$ npm run start  
# watch mode  
$ npm run start:dev  
# production mode  
$ npm run start:prod```  
  
## Test  
  
```bash  
# unit tests  
$ npm run test  
# e2e tests  
$ npm run test:e2e  
# test coverage  
$ npm run test:cov```  
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Anton Sukhovatkin](https://github.com/artonio)
- [Blog](https://blog.exceptionfound.com)

 
