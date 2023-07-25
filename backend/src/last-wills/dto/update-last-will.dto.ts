import { PartialType } from '@nestjs/swagger';
import { CreateLastWillDto } from './create-last-will.dto';

export class UpdateLastWillDto extends PartialType(CreateLastWillDto) {}
