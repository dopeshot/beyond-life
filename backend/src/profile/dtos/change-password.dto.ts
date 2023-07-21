import { PickType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { RegisterDTO } from '../../auth/dtos/register.dto'

// Base on RegisterDTO to inherit password limitations
export class ChangePasswordDto extends PickType(RegisterDTO, [
  'password',
] as const) {
  @IsString()
  oldPassword: string
}
