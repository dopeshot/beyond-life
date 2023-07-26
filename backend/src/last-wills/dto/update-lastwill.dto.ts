import { PartialType } from '@nestjs/swagger'
import { CreateLastWillDto } from './create-lastwill.dto'

export class UpdateLastWillDto extends PartialType(CreateLastWillDto) {}
