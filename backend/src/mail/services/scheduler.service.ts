import { Inject, Injectable } from '@nestjs/common'
import { MailSendService } from './send.service'
import { MailData } from '../interfaces/mail.interface'

/**
 * @description Service reliable for scheduling the sending of emails
 */
@Injectable()
export class MailScheduleService {
  constructor(@Inject() private mailSendService: MailSendService) {}
  async scheduleMailNow(mail: MailData) {
    console.log('Scheduling email')
    await this.mailSendService.sendMail(mail)
  }

  async scheduleMailAtDate(scheduleDate: Date, mail: MailData) {}
}
