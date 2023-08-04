import { PickType } from '@nestjs/swagger'
import { LoginDTO } from './login.dto'

export class SubmitNewPasswordDTO extends PickType(LoginDTO, [
  'password',
] as const) {}
