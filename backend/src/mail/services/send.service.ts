import { Inject, Injectable } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'
import { MailModuleConfig } from '../interfaces/mail-module.interface'
import { MODULE_OPTIONS_TOKEN } from '../metadata/mail.module-definition'
import { MailData } from '../interfaces/mail.interface'

/**
 * @description Service reliable for actually talking to the http server
 */
@Injectable()
export class MailSendService {
  transport: Transporter
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: MailModuleConfig) {
    console.log(options)
    this.transport = createTransport(options.transport, options.defaults)
  }

  sendMail(mail: MailData) {
    console.log('Mail send')
  }
}
