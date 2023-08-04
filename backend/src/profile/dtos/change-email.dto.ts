import { PickType } from '@nestjs/swagger'
import { LoginDTO } from '../../auth/dtos/login.dto'

export class ChangeEmailDTO extends PickType(LoginDTO, ['email'] as const) {}
