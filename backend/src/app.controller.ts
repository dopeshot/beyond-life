import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
  @Get()
  @ApiResponse({ status: 200, description: 'Hello World!', type: String })
  getHello(): string {
    return 'Hello World!'
  }
}
