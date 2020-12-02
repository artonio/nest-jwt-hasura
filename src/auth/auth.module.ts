import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigJwtService } from '../config/config-jwt.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    AppConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useClass: ConfigJwtService
    })
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    ConfigService
  ]
})
export class AuthModule {

}
