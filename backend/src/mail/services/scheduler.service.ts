import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
  forwardRef,
} from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ObjectId } from 'mongoose'
import { MailData, MailEvent } from '../../db/entities/mail-event.entity'
import { MailEventDBService } from '../../db/services/mail-event.service'
import { MailSendService } from './send.service'

/**
 * @description Service reliable for scheduling the sending of emails
 */
@Injectable()
export class MailScheduleService {
  private readonly logger = new Logger(MailScheduleService.name)
  constructor(
    @Inject(forwardRef(() => MailSendService))
    private readonly mailSendService: MailSendService,
    private readonly mailEventService: MailEventDBService,
  ) {}

  async scheduleMailNow(mail: MailData): Promise<void> {
    try {
      await this.mailSendService.sendMail(mail)
    } catch (error) {
      this.logger.error(
        `Encountered error while trying to send email: ${error}`,
      )
      throw new ServiceUnavailableException(
        'We are experiencing issues within our backend, please try again later',
      )
    }
  }

  async scheduleMailAtDate(scheduleDate: Date, mail: MailData): Promise<void> {
    const mailEvent: Partial<MailEvent> = {
      scheduledAt: scheduleDate,
      hasBeenSent: false,
      hasBeenRescheduled: false,
      content: mail,
    }
    const insertedValue = await this.mailEventService.createEvent(mailEvent)
    if (!insertedValue) {
      this.logger.warn(`MailEvent could not be inserted into the database`)
      throw new InternalServerErrorException('Mailevent could not be scheduled')
    }
  }

  private async rescheduleMails(
    ids: ObjectId[],
    newSendDate?: Date,
  ): Promise<void> {
    if (ids.length == 0) return
    if (!newSendDate) {
      newSendDate = new Date()
      // Reschedule 5 hours later by default
      newSendDate.setHours(newSendDate.getHours() + 5)
    }
    await this.mailEventService.rescheduleMails(ids, newSendDate)
  }

  // Run every hour
  @Cron('0 * * * *')
  async sendScheduledMails(): Promise<void> {
    const mails = await this.mailEventService.getOpenEventsBefore(new Date())
    if (!mails) {
      this.logger.log(`No scheduled mails for cron`)
      return
    }
    // TODO: This lacks error handling
    const successIds: ObjectId[] = []
    const failureIds: ObjectId[] = []
    for (const mail of mails) {
      try {
        await this.mailSendService.sendMail(mail.content)
        successIds.push(mail._id)
      } catch (error) {
        this.logger.warn(
          `Could not send scheduled mail due to an error ${error}`,
        )
        failureIds.push(mail._id)
      }
    }
    this.logger.log(
      `Send ${successIds.length} scheduled mails, failed to send ${failureIds.length}`,
    )
    await this.mailEventService.markMailsAsSend(successIds)
    await this.rescheduleMails(failureIds)
  }
}
