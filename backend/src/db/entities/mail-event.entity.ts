import { Severity, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'
import {
  MailTemplateContent,
  MailTemplates,
} from '../../mail/interfaces/mail.interface'

class MailContent {
  @prop()
  subject: string
  @prop()
  contentRaw?: string
  @prop()
  contentTemplate?: MailTemplates
  // Allow mixed to support various template forms
  @prop({ allowMixed: Severity.ALLOW })
  templateContent?: MailTemplateContent
}

class MailRecipient {
  @prop()
  recipient: string

  @prop({ type: () => [String] })
  cc?: string[]

  @prop()
  from?: string
}

export class MailData {
  @prop({ type: () => MailRecipient, _id: false })
  recipient: MailRecipient

  @prop({ type: () => MailContent, _id: false })
  content: MailContent
}

/**
 * @description Entity with all user information
 */
export class MailEvent {
  _id: ObjectId

  @prop({ required: true })
  scheduledAt: Date

  @prop({ required: true, type: () => MailData, _id: false })
  content: MailData

  @prop({ required: true })
  hasBeenSent: boolean

  @prop({ required: true })
  hasBeenRescheduled: boolean
}
