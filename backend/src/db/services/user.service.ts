import { InjectModel } from '@m8a/nestjs-typegoose'
import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { hash as bhash } from 'bcrypt'
import { ObjectId } from 'mongoose'
import {
  CheckoutInformation,
  PaymentOptions,
} from '../../payments/interfaces/payments'
import { User } from '../entities/users.entity'

@Injectable()
export class UserDBService {
  private readonly logger = new Logger(UserDBService.name)

  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  /**
   * @description Fetch one user based on email
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).lean()
  }

  /**
   * @description Fetch one user based on id
   */
  async findOneById(id: ObjectId): Promise<User> {
    return await this.userModel.findOne({ _id: id }).lean()
  }

  /**
   * @description Set user last login time to current time (based on db system time)
   */
  async setLoginTimestamp(id: ObjectId): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { lastLogin: new Date() })
  }

  /**
   * @description Insert user and handle constraint violations
   */
  async insertUser(userData: Partial<User>): Promise<User> {
    try {
      userData.password = await this.hashPassword(userData.password)
      const user: User = await this.userModel.create(userData)
      return user
    } catch (error) {
      this.logger.error(error)
      if (error.code === 11000 && error.keyPattern.email)
        throw new ConflictException('Email is already taken.')
      /* istanbul ignore next */
      throw new ServiceUnavailableException()
    }
  }

  /**
   * @description Set users email verify value
   */
  async updateUserEmailVerify(email: string, newVerifyValue?: boolean) {
    if (!newVerifyValue) {
      newVerifyValue = true
    }
    await this.userModel.updateOne(
      { email },
      { hasVerifiedEmail: newVerifyValue },
    )
  }

  private async hashPassword(password: string): Promise<string> {
    return await bhash(password, 10)
  }

  async updateUserPassword(id: ObjectId, password: string) {
    const hashedPw = await this.hashPassword(password)
    await this.userModel.updateOne({ _id: id }, { password: hashedPw })
  }

  async updateUserEmail(id: ObjectId, email: string) {
    try {
      await this.userModel.updateOne(
        { _id: id },
        { email, hasVerifiedEmail: false },
      )
    } catch (error) {
      this.logger.error(error)
      if (error.code === 11000 && error.keyPattern.email)
        throw new ConflictException('Email is already taken.')
    }
  }

  async deleteUserById(_id: ObjectId) {
    await this.userModel.deleteOne({ _id })
  }

  async updateUserPaymentPlan(
    stripeCustomerId: string,
    paymentPlan: PaymentOptions,
  ) {
    try {
      await this.userModel.findOneAndUpdate(
        { stripeCustomerId },
        { paymentPlan },
      )
    } catch (error) {
      /* istanbul ignore next */
      this.logger.error(error)
      throw new ServiceUnavailableException(
        'Could not update payment plan of the provided customer from Stripe',
      )
    }
  }

  async updateUserCheckoutInformation(
    stripeCustomerId: string,
    checkoutInformation: CheckoutInformation,
  ) {
    // We do 2 calls here since we want to know if the customerId exists
    const user = await this.userModel.findOne({ stripeCustomerId })
    if (!user)
      throw new UnprocessableEntityException(
        'Could not match Stripe event to any user',
      )
    try {
      await this.userModel.findOneAndUpdate(
        {
          stripeCustomerId,
          'checkoutInformation.lastInformationTime': {
            $lt: checkoutInformation.lastInformationTime,
          },
        },
        { checkoutInformation },
        { new: true },
      )
    } catch (error) {
      /* istanbul ignore next */
      this.logger.error(error)
      throw new ServiceUnavailableException(
        'Something went wrong, please try again later!',
      )
    }
  }

  async updateUserStripeCustomerId(_id: string, stripeCustomerId: string) {
    await this.userModel.findByIdAndUpdate({ _id }, { stripeCustomerId })
  }
}
