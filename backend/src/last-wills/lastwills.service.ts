import { Injectable } from '@nestjs/common'
import { CreateLastWillDto } from './dto/create-lastwill.dto'
import { UpdateLastWillDto } from './dto/update-lastwill.dto'

@Injectable()
export class LastWillsService {
  createOne(createLastWillDto: CreateLastWillDto) {
    return 'This action adds a new lastWill'
  }

  findAllMetadataByUser() {
    return `This action returns all lastWills`
  }

  findFullById(id: number) {
    return `This action returns a #${id} lastWill`
  }

  updateOneById(id: number, updateLastWillDto: UpdateLastWillDto) {
    return `This action updates a #${id} lastWill`
  }

  deleteOneById(id: number) {
    return `This action removes a #${id} lastWill`
  }
}
