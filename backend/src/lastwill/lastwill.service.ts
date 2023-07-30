import {
  ForbiddenException,
  Injectable,
  Logger,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { LastWillDBService } from '../db/services/lastwill.service'
import { UserDBService } from '../db/services/user.service'
import { paymentPlans } from '../payments/interfaces/payments'
import { CreateLastWillDto } from './dto/create-lastwill.dto'

@Injectable()
export class LastWillService {
  private readonly logger = new Logger(LastWillService.name)
  constructor(
    private readonly userService: UserDBService,
    private readonly lastwillDbService: LastWillDBService,
  ) {}

  // TODO: implement in other issue
  async getFullTextLastWill(id: string, userId: ObjectId) {
    throw new NotImplementedException()
  }

  async createLastWill(createLastWillDto: CreateLastWillDto, userId: ObjectId) {
    const lastWillCount = await this.lastwillDbService.countDocuments(userId)

    const user = await this.userService.findOneById(userId)
    if (!user) throw new UnauthorizedException('Only Existing users can create')

    const plan = user.paymentPlan
    const allowedWills = Math.abs(paymentPlans[plan])

    if (lastWillCount >= allowedWills)
      throw new ForbiddenException(
        `Exceeding allowed last wills: ${allowedWills}`,
      )

    return await this.lastwillDbService.createOne(createLastWillDto, userId)
  }
}
