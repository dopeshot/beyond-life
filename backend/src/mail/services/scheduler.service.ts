import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  forwardRef,
} from '@nestjs/common'
import { MailSendService } from './send.service'
import { MailData } from '../interfaces/mail.interface'
import { MailEventService } from '../../db/services/mail-event.service'
import { MailEventEntity } from '../../db/entities/mail-event.entity'
import { Cron } from '@nestjs/schedule'

/**
 * @description Service reliable for scheduling the sending of emails
 */
@Injectable()
export class MailScheduleService {
  private readonly logger = new Logger(MailScheduleService.name)
  constructor(
    @Inject(forwardRef(() => MailSendService))
    private readonly mailSendService: MailSendService,
    private readonly mailEventService: MailEventService,
  ) {}
  async scheduleMailNow(mail: MailData) {
    await this.mailSendService.sendMail(mail)
  }

  async scheduleMailAtDate(scheduleDate: Date, mail: MailData) {
    const mailEvent: Partial<MailEventEntity> = {
      scheduledAt: scheduleDate,
      hasBeenSend: false,
      hasBeenRescheduled: false,
      content: mail,
    }
    const insertedValue = await this.mailEventService.createEvent(mailEvent)
    if (!insertedValue) {
      throw new InternalServerErrorException('Mailevent could not be scheduled')
    }
  }

  // Run every hour
  @Cron('0 * * * *')
  async sendScheduledMails() {
    const mails = await this.mailEventService.getOpenEventsBefore(new Date())
    if (!mails) {
      this.logger.log(`No scheduled mails for cron`)
      return
    }
    // TODO: This lacks error handling
    const successIds: number[] = []
    for (const mail of mails) {
      await this.mailSendService.sendMail(mail.content)
      successIds.push(mail.pkMailEventId)
    }
    this.logger.log(`Send ${mails.length} scheduled mails`)
    await this.mailEventService.markMailsAsSend(successIds)
  }
}
