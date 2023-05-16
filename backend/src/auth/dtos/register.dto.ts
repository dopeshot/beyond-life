import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'
import { LoginDTO } from './login.dto'

/**
 * @description DTO used for register endpoint(s)
 */
export class RegisterDTO extends LoginDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  @ApiProperty({ description: 'Username for the user', example: 'CoffeeLover' })
  username: string
}
