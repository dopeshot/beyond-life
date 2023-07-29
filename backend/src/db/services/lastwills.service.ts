import { InjectModel } from '@m8a/nestjs-typegoose'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'
import { CreateLastWillDto } from '../../last-wills/dto/create-lastwill.dto'
import { UpdateLastWillDto } from '../../last-wills/dto/update-lastwill.dto'
import { paymentPlans } from '../../payments/interfaces/payments'
import { LastWill } from '../entities/lastwill.entity'

@Injectable()
export class LastWillsService {
  private readonly logger = new Logger(LastWillsService.name)
  constructor(
    @InjectModel(LastWill)
    private readonly lastWillModel: ReturnModelType<typeof LastWill>,
  ) {}

  async createOne(createLastWillDto: CreateLastWillDto, userId: ObjectId) {
    const lastWillCount = await this.lastWillModel.countDocuments({
      accountId: userId,
    })
    const plan = 'single' // TODO: add plan to auth user or make userService request here
    const allowedWills = Math.abs(paymentPlans[plan])
    if (lastWillCount >= allowedWills)
      throw new UnauthorizedException(
        `Exceeding allowed last wills: ${allowedWills}`,
      )

    const createdLastWill = await this.lastWillModel.create({
      ...createLastWillDto,
      accountId: userId,
    })
    return createdLastWill.toObject() satisfies LastWill
  }

  async findAllByUser(userId: ObjectId) {
    return await this.lastWillModel.find({ accountId: userId })
  }

  async findFullById(id: string, userId: ObjectId) {
    return await this.lastWillModel.findOne({ _id: id, accountId: userId })
  }

  async getFullTextLastWill(id: string, userId: ObjectId) {
    return `This action returns a #${id} lastWill`
  }

  async updateOneById(
    id: string,
    userId: ObjectId,
    updateLastWillDto: UpdateLastWillDto,
  ) {
    return await this.lastWillModel.findOneAndUpdate(
      { _id: id, accountId: userId },
      updateLastWillDto,
      { new: true },
    )
  }

  async deleteOneById(id: string, userId: ObjectId) {
    await this.lastWillModel.deleteOne({ _id: id, accountId: userId })
  }
}
