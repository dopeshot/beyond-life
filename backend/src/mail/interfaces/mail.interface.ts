enum MailTemplates {
  VERIFY = 'VERIFY',
}

interface MailContent {
  subject: string
  contentRaw?: string
  contentTemplate?: MailTemplates
  templateContent?: never
}

interface MailRecipient {
  recipient: string
  cc?: string[]
  from?: string
}

export interface MailData {
  recipient: MailRecipient
  content: MailContent
}
