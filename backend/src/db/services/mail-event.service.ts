import { Injectable, Logger } from '@nestjs/common'
import { MailEvent } from '../entities/mail-event.entity'
import { InjectModel } from '@m8a/nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'

@Injectable()
export class MailEventService {
  private readonly logger = new Logger(MailEventService.name)

  constructor(
    @InjectModel(MailEvent)
    private readonly mailEventModel: ReturnModelType<typeof MailEvent>,
  ) {}

  async createEvent(event: Partial<MailEvent>): Promise<MailEvent> {
    const newEvent = await this.mailEventModel.create(event)
    return newEvent
  }

  async getOpenEventsBefore(endDate: Date): Promise<MailEvent[]> {
    const events = this.mailEventModel
      .find({
        scheduledAt: {
          $lte: endDate,
        },
      })
      .lean()
    return events
  }

  async markMailsAsSend(ids: ObjectId[]): Promise<void> {
    if (ids.length == 0) {
      this.logger.log('Empty update will not be executed')
      return
    }
    await this.mailEventModel.updateMany(
      { _id: { $in: ids } },
      { hasBeenSent: true },
    )
  }

  async rescheduleMails(ids: ObjectId[], newDate: Date): Promise<void> {
    if (ids.length == 0) {
      this.logger.log('Empty update will not be executed')
      return
    }
    await this.mailEventModel.updateMany(
      { _id: { $in: ids } },
      {
        scheduledAt: newDate,
        hasBeenRescheduled: true,
      },
    )
  }
}
