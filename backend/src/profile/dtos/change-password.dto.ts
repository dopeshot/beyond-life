import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { RegisterDTO } from '../../auth/dtos/register.dto'

// Base on RegisterDTO to inherit password limitations
export class ChangePasswordDto extends PickType(RegisterDTO, [
  'password',
] as const) {
  @IsString()
  @ApiProperty({
    description: 'Current password of the user',
    example: 'newPasswordWhichIsAlsoVerySecret',
  })
  oldPassword: string
}
