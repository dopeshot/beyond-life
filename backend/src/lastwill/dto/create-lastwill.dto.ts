import { OmitType } from '@nestjs/swagger'
import { LastWill } from '../../db/entities/lastwill.entity'

export class CreateLastWillDto extends OmitType(LastWill, [
  'accountId',
  '_id',
  'createdAt',
  'updatedAt',
]) {}
