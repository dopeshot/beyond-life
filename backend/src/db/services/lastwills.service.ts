import { InjectModel } from '@m8a/nestjs-typegoose'
import { Injectable, Logger } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'
import { CreateLastWillDto } from '../../last-wills/dto/create-lastwill.dto'
import { UpdateLastWillDto } from '../../last-wills/dto/update-lastwill.dto'
import { LastWill } from '../entities/lastwill.entity'

@Injectable()
export class LastWillsService {
  private readonly logger = new Logger(LastWillsService.name)
  constructor(
    @InjectModel(LastWill)
    private readonly lastWillModel: ReturnModelType<typeof LastWill>,
  ) {}

  async createOne(createLastWillDto: CreateLastWillDto, userId: ObjectId) {
    // TODO: not possible if exceeds allowed by plan
    return 'This action adds a new lastWill'
  }

  async findAllMetadataByUser(userId: ObjectId) {
    return `This action returns all lastWills`
  }

  async findFullById(id: string, userId: ObjectId) {
    return `This action returns a #${id} lastWill`
  }

  async getFullTextLastWill(id: string, userId: ObjectId) {
    return `This action returns a #${id} lastWill`
  }

  async updateOneById(
    id: string,
    userId: ObjectId,
    updateLastWillDto: UpdateLastWillDto,
  ) {
    return `This action updates a #${id} lastWill`
  }

  async deleteOneById(id: string, userId: ObjectId) {
    // TODO: delete only if user is matching aswell

    return `This action removes a #${id} lastWill`
  }
}
