import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
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
      .setTitle('BeyondLife Api')
      .setDescription('The BeyondLife Api')
      .setVersion('0.1')
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
          description: `Please enter verify token in following format: Bearer <JWT>`,
          scheme: 'Bearer',
          type: 'http',
        },
        'refresh_token',
      )
      .build()
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    })

    SwaggerModule.setup('swagger', app, document)
  }

  app.enableCors()

  await app.listen(process.env.PORT || 3001)
}

bootstrap()
