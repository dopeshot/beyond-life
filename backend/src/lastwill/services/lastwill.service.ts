import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { LastWill, PersonType } from '../../db/entities/lastwill.entity'
import { LastWillDBService } from '../../db/services/lastwill.service'
import { UserDBService } from '../../db/services/user.service'
import { paymentPlans } from '../../payments/interfaces/payments'
import { CreateLastWillDto } from '../dto/create-lastwill.dto'
import { GeneratedLastWillDTO } from '../dto/generated-lastwill.dto'
import {
  generateFinancialInheritancePragraphs,
  generateInitialText,
  generateItemInheritanceParagraph,
  generateLocationHeader,
  generateTestatorHeader,
  getLegalClauses,
} from '../utilities/lastwill-templating.util'

@Injectable()
export class LastWillService {
  private readonly logger = new Logger(LastWillService.name)
  constructor(
    private readonly userService: UserDBService,
    private readonly lastwillDbService: LastWillDBService,
  ) {}

  // TODO: implement in other issue
  async getFullTextLastWill(id: string, userId: ObjectId) {
    const lastWill = await this.lastwillDbService.findFullById(id, userId)

    if (!lastWill) {
      throw new NotFoundException()
    }
    return this.generateLastWillFullText(lastWill)
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

  private includesFinancialInheritance(lastWill: LastWill): boolean {
    if (lastWill.financialAssets.length === 0) return false
    for (const heir of lastWill.heirs) {
      if (heir.percentage) {
        return true
      }
    }
    // false bc noone actually inherits anything
    return false
  }

  private includesItemInheritance(lastWill: LastWill): boolean {
    if (lastWill.items.length === 0) return false
    for (const heir of lastWill.heirs) {
      if (heir.type !== PersonType.ORGANISATION) {
        // heir is now guaranteed to be a Person
        if (heir.itemIds?.length > 0) {
          return true
        }
      }
    }
    // false bc noone actually inherits anything
    return false
  }

  private generateLastWillFullText(lastWill: LastWill): GeneratedLastWillDTO {
    let generatedLastWill: GeneratedLastWillDTO
    // 1. Set headers
    const testator = lastWill.testator
    const testatorAddress = testator.address
    generatedLastWill.testatorHeader = generateTestatorHeader(
      testator.name,
      testatorAddress.street,
      testatorAddress.houseNumber,
      testatorAddress.city,
      testatorAddress.zipCode,
    )

    generatedLastWill.locationHeader = generateLocationHeader(
      lastWill.testator.address?.city,
    )

    generatedLastWill.title = 'Mein letzter Wille und Testament'

    // Generate outer text
    generatedLastWill.initialText = generateInitialText(
      testator.name,
      testator.birthDate,
      testator.birthPlace,
    )
    // Generate Erbeinsetzung
    if (this.includesFinancialInheritance(lastWill)) {
      const financialHeirs = []
      for (const heir of lastWill.heirs) {
        if (heir.percentage) {
          financialHeirs.push(heir)
        }
      }
      generatedLastWill.paragraphs.push(
        ...generateFinancialInheritancePragraphs(
          financialHeirs,
          lastWill.financialAssets,
        ),
      )
    }

    if (this.includesItemInheritance(lastWill)) {
      const itemHeirs = []
      for (const heir of lastWill.heirs) {
        if (heir.type !== PersonType.ORGANISATION) {
          if (heir.itemIds?.length > 0) {
            itemHeirs.push(heir)
          }
        }
      }
      generatedLastWill.paragraphs.push(
        generateItemInheritanceParagraph(itemHeirs, lastWill.items),
      )
    }

    generatedLastWill.paragraphs.push(...getLegalClauses())
    return generatedLastWill
  }
}
