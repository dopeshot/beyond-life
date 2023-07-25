import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { compare } from 'bcrypt'
import { ObjectId } from 'mongoose'
import { AuthService } from '../auth/auth.service'
import { MailData } from '../db/entities/mail-event.entity'
import { UserService } from '../db/services/user.service'
import { MailTemplates } from '../mail/interfaces/mail.interface'
import { MailScheduleService } from '../mail/services/scheduler.service'

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name)
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly mailService: MailScheduleService,
  ) {}

  async updatePassword(id: ObjectId, oldPassword: string, newPassword: string) {
    // Verify that old password is right
    const user = await this.userService.findOneById(id)

    if (!user || !(await compare(oldPassword, user.password))) {
      throw new UnauthorizedException(
        'This is not allowed...either you do not exist or the provided password was invalid',
      )
    }
    await this.userService.updateUserPassword(id, newPassword)
  }

  async updateUserEmail(id: ObjectId, newEmail: string) {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new UnauthorizedException()
    }

    if (user.email === newEmail) {
      // Do not throw error here
      // Throwing an error would allow for an attacker to brute force their way to the accounts email address
      return
    }

    try {
      await this.userService.updateUserEmail(id, newEmail)
    } catch (error) {
      // If error is already httpexception => Continue throwing
      if (error instanceof HttpException) {
        throw error
      }

      this.logger.warn(`Could not update user email due to an error ${error}`)
      throw new InternalServerErrorException(
        'Something went wrong, please try again later',
      )
    }

    try {
      await this.authService.requestUserVerifyMail(id)
    } catch (error) {
      this.logger.warn(
        `Updated email for user did not receive verify email due to an error. The user update continues anyways. ${error}`,
      )
    }
  }

  async deleteProfile(id: ObjectId, password: string) {
    const user = await this.userService.findOneById(id)

    if (!user || !compare(password, user.password)) {
      throw new UnauthorizedException()
    }

    await this.userService.deleteUserById(id)

    if (!user.hasVerifiedEmail) return

    const mailData: MailData = {
      content: {
        subject: 'Account gelöscht',
        contentTemplate: MailTemplates.ACCOUNT_DELETED,
      },
      recipient: {
        recipient: user.email,
      },
    }
    try {
      await this.mailService.scheduleMailNow(mailData)
    } catch (error) {
      this.logger.error(
        `Could not send email regarding account deletion. Deletion will continue anyway. ${error}`,
      )
    }
  }
}
