import { Controller, Get } from '@nestjs/common'
import { ApiProperty, ApiResponse } from '@nestjs/swagger'

class STUFF {
  @ApiProperty()
  first: string
  @ApiProperty()
  second: string
}
@Controller()
export class AppController {
  @Get()
  @ApiResponse({ status: 200, description: 'Hello World!', type: STUFF })
  getHello(): STUFF {
    return { first: 'Hello', second: 'World' }
  }
}
