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
import { LastWillDBService } from '../db/services/lastwill.service'
import { UserDBService } from '../db/services/user.service'
import { MailTemplates } from '../mail/interfaces/mail.interface'
import { MailScheduleService } from '../mail/services/scheduler.service'

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name)
  constructor(
    private readonly userService: UserDBService,
    private readonly authService: AuthService,
    private readonly mailService: MailScheduleService,
    private readonly lastwillDbService: LastWillDBService,
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

      // This should only happen on DB failure...which we do not test
      /* istanbul ignore next */
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

  async deleteProfile(id: ObjectId) {
    const user = await this.userService.findOneById(id)

    if (!user) {
      throw new UnauthorizedException()
    }

    await this.userService.deleteUserById(id)
    await this.lastwillDbService.deleteAllByUser(id)

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
      return
    } catch (error) {
      this.logger.error(
        `Could not send email regarding account deletion. Deletion will continue anyway.`,
      )
    }

    // If we get here the mail could not be send as of now => Fallback to just scheduling it
    const newSendDate = new Date()
    // Reschedule 5 hours later by default
    newSendDate.setHours(newSendDate.getHours() + 5)
    try {
      await this.mailService.scheduleMailAtDate(newSendDate, mailData)
    } catch (error) {
      this.logger.warn(
        `Mail could not be scheduled due to an error. Account deletion continues anyways ${error}`,
      )
    }
  }
}
