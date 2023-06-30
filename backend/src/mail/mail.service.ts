import { Inject, Injectable } from '@nestjs/common'
import { Transporter, createTransport } from 'nodemailer'
import { MailModuleConfig } from './types/mail-module.type'
import { MODULE_OPTIONS_TOKEN } from './metadata/mail.module-definition'

@Injectable()
export class MailService {
  transport: Transporter
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: MailModuleConfig) {
    console.log(options)
    this.transport = createTransport(options.transport, options.defaults)
  }
}
