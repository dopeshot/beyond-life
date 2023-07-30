import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  // Swagger
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Siebtesleben Api')
      .setDescription('The Siebtesleben Api')
      .setVersion('0.2')
      .addBearerAuth(
        {
          description: `Please enter access token in following format: Bearer <JWT>`,
          scheme: 'Bearer',
          type: 'http',
        },
        'access_token',
      )
      .addBearerAuth(
        {
          description: `Please enter refresh token in following format: Bearer <JWT>`,
          scheme: 'Bearer',
          type: 'http',
        },
        'refresh_token',
      )
      .addBearerAuth(
        {
          description: `Please enter password reset token in following format: Bearer <JWT>`,
          scheme: 'Bearer',
          type: 'http',
        },
        'password_reset_token',
      )
      .build()
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    })

    const theme = new SwaggerTheme('v3')
    SwaggerModule.setup('swagger', app, document, {
      customCss: theme.getBuffer('dark'),
    })
  }

  app.enableCors({
    origin: '*',
    credentials: true,
  }) // TODO: only allow our frontend url

  await app.listen(process.env.PORT || 3001)
}

bootstrap()
