import { PickType } from '@nestjs/swagger'
import { RegisterDTO } from './register.dto'

export class SubmitNewPasswordDTO extends PickType(RegisterDTO, [
  'password',
] as const) {}
