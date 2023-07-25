import { Injectable } from '@nestjs/common';
import { CreateLastWillDto } from './dto/create-last-will.dto';
import { UpdateLastWillDto } from './dto/update-last-will.dto';

@Injectable()
export class LastWillsService {
  create(createLastWillDto: CreateLastWillDto) {
    return 'This action adds a new lastWill';
  }

  findAll() {
    return `This action returns all lastWills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lastWill`;
  }

  update(id: number, updateLastWillDto: UpdateLastWillDto) {
    return `This action updates a #${id} lastWill`;
  }

  remove(id: number) {
    return `This action removes a #${id} lastWill`;
  }
}
