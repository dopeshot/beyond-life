import { PickType } from '@nestjs/swagger'
import { LoginDTO } from './login.dto'

export class ForgotPasswordDTO extends PickType(LoginDTO, ['email'] as const) {}
