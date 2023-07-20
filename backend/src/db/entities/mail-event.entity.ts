import { modelOptions, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'

class MailContent {
  @prop()
  subject: string
  @prop()
  contentRaw?: string
  @prop()
  contentTemplate?: MailTemplates
  @prop()
  templateContent?: string
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
