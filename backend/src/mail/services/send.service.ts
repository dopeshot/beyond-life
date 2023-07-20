import { Inject, Injectable, Logger } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'
import { MailModuleConfig } from '../interfaces/mail-module.interface'
import { MODULE_OPTIONS_TOKEN } from '../metadata/mail.module-definition'
import { MailData } from '../interfaces/mail.interface'
import { VerifyMailContent } from '../interfaces/mail-interface-contents.interface'

/**
 * @description Service reliable for actually talking to the http server
 */
@Injectable()
export class MailSendService {
  private logger = new Logger(MailSendService.name)
  private transport: Transporter
  defaultFrom: string
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: MailModuleConfig) {
    this.transport = createTransport(options.transport, options.defaults)
    this.defaultFrom = options.defaultSender
  }

  async sendMail(mail: MailData) {
    const mailContent = mail.content.contentRaw
    if (mail.content.contentTemplate) {
      this.renderTemplate(
        mail.content.contentTemplate,
        mail.content.templateContent,
      )
    }
      await this.transport.sendMail({
        to: mail.recipient.recipient,
        cc: mail.recipient.cc,
        from: mail.recipient.from || this.defaultFrom,
        subject: mail.content.subject,
        // Assume always HTML...our emails SHOULD be styled anyways
        html: mailContent,
      })
  }

  private renderTemplate(templateName: string, content: VerifyMailContent) {
    // TODO: Add template lookup/render as soon as we have templates
    return ''
  }
}
