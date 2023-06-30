import { VerifyMailContent } from './mail-interface-contents.interface'

enum MailTemplates {
  VERIFY = 'VERIFY',
}

interface MailContent {
  contentRaw: string
  contentTemplate: MailTemplates
  templateContent: VerifyMailContent
}

interface MailRecipient {
  recipients: string[]
  cc: string[]
}

export interface MailData {
  recipient: MailRecipient
  content: MailContent
}
