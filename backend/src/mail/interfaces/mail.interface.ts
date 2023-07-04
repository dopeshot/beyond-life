import { VerifyMailContent } from './mail-interface-contents.interface'

enum MailTemplates {
  VERIFY = 'VERIFY',
}

interface MailContent {
  subject: string
  contentRaw?: string
  contentTemplate?: MailTemplates
  templateContent?: VerifyMailContent
}

interface MailRecipient {
  recipients: string
  cc?: string[]
  from?: string
}

export interface MailData {
  recipient: MailRecipient
  content: MailContent
}
