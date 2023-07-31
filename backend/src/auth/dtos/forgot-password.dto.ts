import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ForgotPasswordDTO {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'Email of the users account',
    example: 'test@test.test',
  })
  email: string
}
