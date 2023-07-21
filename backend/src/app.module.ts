import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { DbModule } from './db/db.module'
import { MailModule } from './mail/mail.module'
import { PaymentsModule } from './payments/payments.module'
import { ProfileModule } from './profile/profile.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        authSource: 'admin',
        uri: `mongodb://${configService.get(
          'DB_USER_NAME',
        )}:${configService.get('DB_USER_PW')}@${configService.get(
          'DB_HOST',
        )}:${configService.get('DB_PORT')}/${configService.get('DB_DB')}`,
        family: 4,
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
            user: configService.get('MAIL_AUTH_USERNAME'),
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
    ProfileModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
