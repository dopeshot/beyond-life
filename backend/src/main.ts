import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as fs from 'fs'
import * as yaml from 'yaml'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
      .build()
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    })

    const yamlString: string = yaml.stringify(document, {})
    fs.writeFileSync('../api.yaml', yamlString)

    SwaggerModule.setup('swagger', app, document)
  }

  app.enableCors()

  await app.listen(process.env.PORT || 3001)
}

bootstrap()
