import { Inject, Injectable, Logger } from '@nestjs/common'
import { renderFile } from 'ejs'
import { Transporter, createTransport } from 'nodemailer'
import { join } from 'path'
import { MailData } from '../../db/entities/mail-event.entity'
import { MailModuleConfig } from '../interfaces/mail-module.interface'
import { MailTemplateContent } from '../interfaces/mail.interface'
import { MODULE_OPTIONS_TOKEN } from '../metadata/mail.module-definition'

/**
 * @description Service reliable for actually talking to the http server
 */
@Injectable()
export class MailSendService {
  private logger = new Logger(MailSendService.name)
  private transport: Transporter
  private readonly templateDir = join(__dirname, '..', 'templates')
  private defaultFrom: string
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: MailModuleConfig) {
    this.transport = createTransport(options.transport, options.defaults)
    this.defaultFrom = options.defaultSender
  }

  async sendMail(mail: MailData): Promise<void> {
    let mailContent = mail.content.contentRaw
    if (mail.content.contentTemplate) {
      mailContent = await this.renderTemplate(
        mail.content.contentTemplate,
        mail.content.templateContent,
      )
    }
    const { recipient, cc, from } = mail.recipient
    this.logger.debug(`Sending mail to ${recipient}`)
    await this.transport.sendMail({
      to: recipient,
      cc: cc,
      from: from || this.defaultFrom,
      subject: mail.content.subject,
      // Assume always HTML...our emails SHOULD be styled anyways
      html: mailContent,
    })
  }

  private renderTemplate(
    templateName: string,
    content: MailTemplateContent,
  ): string {
    return renderFile(
      join(this.templateDir, `${templateName}.template.ejs`),
      content || {},
    )
  }
}
