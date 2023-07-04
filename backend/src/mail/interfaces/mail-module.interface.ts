import SMTPTransport from 'nodemailer/lib/smtp-transport'

export interface MailModuleConfig {
  transport?: string | SMTPTransport | SMTPTransport.Options
  defaults?: SMTPTransport.Options
  defaultSender: string
}
