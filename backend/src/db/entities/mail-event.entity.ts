import { ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { MailData } from '../../mail/interfaces/mail.interface'

/**
 * @description Entity with all user information
 */
@Entity('mail_events', { schema: 'public' })
export class MailEventEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'pk_mail_event_id' })
  pkMailEventId: number

  @Column({
    type: 'timestamp with time zone',
    name: 'scheduled_at',
  })
  @ApiPropertyOptional({
    example: Date.now(),
  })
  scheduledAt: Date

  @Column({
    type: 'json',
    name: 'content',
  })
  content: MailData

  @Column({
    type: 'boolean',
    name: 'has_been_send',
    default: false,
  })
  hasBeenSent: boolean

  @Column({
    type: 'boolean',
    name: 'has_been_rescheduled',
    default: false,
  })
  hasBeenRescheduled: boolean
}
