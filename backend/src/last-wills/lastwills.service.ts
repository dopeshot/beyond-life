import { InjectModel } from '@m8a/nestjs-typegoose'
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'
import { LastWill } from '../db/entities/lastwill.entity'
import { UserService } from '../db/services/user.service'
import { paymentPlans } from '../payments/interfaces/payments'
import { CreateLastWillDto } from './dto/create-lastwill.dto'
import { UpdateLastWillDto } from './dto/update-lastwill.dto'

@Injectable()
export class LastWillsService {
  private readonly logger = new Logger(LastWillsService.name)
  constructor(
    @InjectModel(LastWill)
    private readonly lastWillModel: ReturnModelType<typeof LastWill>,
    private readonly userService: UserService,
  ) {}

  async createOne(createLastWillDto: CreateLastWillDto, userId: ObjectId) {
    const lastWillCount = await this.lastWillModel.countDocuments({
      accountId: userId,
    })
    const user = await this.userService.findOneById(userId)
    if (!user) throw new UnauthorizedException('Only Existing users can create')
    const plan = user.paymentPlan
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
    return await this.lastWillModel.find({ accountId: userId }).lean()
  }

  async findFullById(id: string, userId: ObjectId) {
    const lastWill = await this.lastWillModel
      .findOne({ _id: id, accountId: userId })
      .lean()
    if (!lastWill) throw new NotFoundException('Last will not found')
    return lastWill
  }

  async getFullTextLastWill(id: string, userId: ObjectId) {
    return `This action returns a #${id} lastWill`
  }

  async updateOneById(
    id: string,
    userId: ObjectId,
    updateLastWillDto: UpdateLastWillDto,
  ) {
    const updatedLastWill = await this.lastWillModel
      .findOneAndUpdate({ _id: id, accountId: userId }, updateLastWillDto, {
        new: true,
      })
      .lean()
    if (!updatedLastWill) throw new NotFoundException('Last will not found')
    return updatedLastWill
  }

  async deleteOneById(id: string, userId: ObjectId) {
    await this.lastWillModel.deleteOne({ _id: id, accountId: userId })
  }
}
