import { InjectModel } from '@m8a/nestjs-typegoose'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'
import { CreateLastWillDto } from '../../lastwill/dto/create-lastwill.dto'
import { UpdateLastWillDto } from '../../lastwill/dto/update-lastwill.dto'
import { LastWill } from '../entities/lastwill.entity'

@Injectable()
export class LastWillDBService {
  private readonly logger = new Logger(LastWillDBService.name)
  constructor(
    @InjectModel(LastWill)
    private readonly lastWillModel: ReturnModelType<typeof LastWill>,
  ) {}

  async createOne(
    createLastWillDto: CreateLastWillDto,
    userId: ObjectId,
  ): Promise<LastWill> {
    this.logger.log('Creating new Lastwill')
    const createdLastWill = await this.lastWillModel.create({
      ...createLastWillDto,
      accountId: userId,
    })
    return createdLastWill.toObject() satisfies LastWill
  }

  async findAllByUser(userId: ObjectId): Promise<LastWill[]> {
    return await this.lastWillModel.find({ accountId: userId }).lean()
  }

  async findFullById(id: string, userId: ObjectId): Promise<LastWill> {
    const lastWill = await this.lastWillModel
      .findOne({ _id: id, accountId: userId })
      .lean()
    if (!lastWill) throw new NotFoundException('Last will not found')
    return lastWill
  }

  async updateOneById(
    id: string,
    userId: ObjectId,
    updateLastWillDto: UpdateLastWillDto,
  ): Promise<LastWill> {
    this.logger.log('Updating last will')
    const updatedLastWill = await this.lastWillModel
      .findOneAndUpdate({ _id: id, accountId: userId }, updateLastWillDto, {
        new: true,
      })
      .lean()
    if (!updatedLastWill) throw new NotFoundException('Last will not found')
    return updatedLastWill
  }

  async deleteOneById(id: string, userId: ObjectId): Promise<void> {
    this.logger.log('Deleting last will')
    await this.lastWillModel.deleteOne({ _id: id, accountId: userId })
  }

  async countDocuments(accountId: ObjectId): Promise<number> {
    return await this.lastWillModel.countDocuments({ accountId })
  }

  async deleteAllByUser(accountId: ObjectId): Promise<void> {
    this.logger.log('Deleting all last wills for user')
    await this.lastWillModel.deleteMany({ accountId })
  }
}
