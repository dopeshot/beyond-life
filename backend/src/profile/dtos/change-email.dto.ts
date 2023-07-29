import { PickType } from '@nestjs/swagger'
import { RegisterDTO } from '../../auth/dtos/register.dto'

export class ChangeEmailDTO extends PickType(RegisterDTO, ['email'] as const) {}
