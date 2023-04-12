import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'


@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Never called, only used for validating the setup works
  private typeValidation(){
	 return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
} 

