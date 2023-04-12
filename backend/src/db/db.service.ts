import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient, User } from '@prisma/client'

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  // Never called, only used for validating the setup works
  private async typeValidation(): Promise<void> {
    const user = await this.user.findFirst({})
    console.log(user.email)
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
