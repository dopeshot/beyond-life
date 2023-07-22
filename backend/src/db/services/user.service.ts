import { InjectModel } from '@m8a/nestjs-typegoose'
import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { hash as bhash } from 'bcrypt'
import { ObjectId, Schema } from 'mongoose'
import { User } from '../entities/users.entity'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

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
  async findOneById(id: Schema.Types.ObjectId): Promise<User> {
    return await this.userModel.findOne({ _id: id }).lean()
  }

  /**
   * @description Set user last login time to current time (based on db system time)
   */
  async setLoginTimestamp(id: ObjectId): Promise<void> {
    // Use postgres function to get the current timestamp. This allows for consistent time measurements even with multiple auth services running
    await this.userModel.updateOne(
      { _id: id },
      {
        lastLogin: new Date(),
      },
    )
  }

  /**
   * @description Insert user and handle constraint violations
   */
  async insertUser(userData: Partial<User>): Promise<User> {
    try {
      userData.password = await this.hashPassword(userData.password)
      const user: User = await this.userModel.create({
        ...userData,
        createdAt: new Date(),
      })

      return user
    } catch (error) {
      this.logger.error(error)
      // Necessary due to incomplete typeorm type
      if (error.code === 11000 && error.keyPattern.email)
        throw new ConflictException('Email is already taken.')
      else if (error instanceof ServiceUnavailableException) throw error
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
      {
        hasVerifiedEmail: newVerifyValue,
      },
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
    await this.userModel.updateOne({ _id: id }, { email })
  }
}
