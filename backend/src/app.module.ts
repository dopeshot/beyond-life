import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { SharedModule } from './shared/shared.module'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get<string>('DB_USER_NAME'),
        password: configService.get<string>('DB_USER_PW'),
        database: configService.get<string>('DB_DB'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    MailModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: +configService.get('MAIL_HOST_PORT'),
          // Default secure option to false
          secure: !['false', 'False', '0'].includes(
            configService.get('MAIL_IS_SECURE'),
          ),
          auth: {
            user: configService.get('MAIL_AUTH_USERNANE'),
            pass: configService.get('MAIL_AUTH_PW'),
          },
        },
        defaultSender: configService.get('MAIL_DEFAULT_SENDER'),
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    DbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
