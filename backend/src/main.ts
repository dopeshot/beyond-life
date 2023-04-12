import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DbService } from './db/db.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Ensure save shutdown
  const prismaService = app.get(DbService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3001)
}

bootstrap()
