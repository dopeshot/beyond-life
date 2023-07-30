import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { LastWill } from '../../db/entities/lastwill.entity'
import { LastWillDBService } from '../../db/services/lastwill.service'
import { UserDBService } from '../../db/services/user.service'
import { paymentPlans } from '../../payments/interfaces/payments'
import { CreateLastWillDto } from '../dto/create-lastwill.dto'
import { GeneratedLastWillDTO } from '../dto/generated-lastwill.dto'
import { LastWillTemplateRendererService } from './lastwill-template-renderer.service'

@Injectable()
export class LastWillService {
  private readonly logger = new Logger(LastWillService.name)
  constructor(
    private readonly userService: UserDBService,
    private readonly lastwillDbService: LastWillDBService,
    private readonly lastWillTemplateRendererService: LastWillTemplateRendererService,
  ) {}

  // TODO: implement in other issue
  async getFullTextLastWill(id: string, userId: ObjectId) {
    const lastWill = await this.lastwillDbService.findFullById(id, userId)

    if (!lastWill) {
      throw new NotFoundException()
    }
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

  private generateLastWillFullText(lastWill: LastWill) {
    let generatedLastWill: GeneratedLastWillDTO
    // 1. Set headers
    //generatedLastWill.testatorHeader = generateTestatorHeader

    generatedLastWill.locationHeader = `${
      lastWill.testator.address.city || '[Stadt]'
    }, den ${new Date().toLocaleDateString('de-DE')}`
  }
}
