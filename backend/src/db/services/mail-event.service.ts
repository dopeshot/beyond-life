import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LessThan, Repository } from 'typeorm'
import { MailEventEntity } from '../entities/mail-event.entity'

@Injectable()
export class MailEventService {
  private readonly logger = new Logger(MailEventService.name)

  constructor(
    @InjectRepository(MailEventEntity)
    private readonly mailEventEntity: Repository<MailEventEntity>,
  ) {}

  async createEvent(event: Partial<MailEventEntity>): Promise<MailEventEntity> {
    const newEvent = this.mailEventEntity.create(event)
    await this.mailEventEntity.save(newEvent)
    return newEvent
  }

  async getOpenEventsBefore(endDate: Date): Promise<MailEventEntity[]> {
    const events = this.mailEventEntity.findBy({
      scheduledAt: LessThan(endDate),
    })
    return events
  }

  async markMailsAsSend(ids: number[]): Promise<void> {
    if (ids.length == 0) {
      return
    }
    await this.mailEventEntity.update(ids, { hasBeenSend: true })
  }

  async rescheduleMails(ids: number[], newDate: Date): Promise<void> {
    if (ids.length == 0) {
      return
    }
    await this.mailEventEntity.update(ids, {
      scheduledAt: newDate,
      hasBeenRescheduled: true,
    })
  }
}
