import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { MailData } from '../../mail/interfaces/mail.interface'

/**
 * @description Entity with all user information
 */
@Entity('mail_events', { schema: 'public' })
export class MailEventEntity {
  @Expose()
  @Column({
    type: 'timestamp with time zone',
    name: 'scheduled_at',
  })
  @ApiPropertyOptional({
    description: 'Creation date of user',
    example: Date.now(),
  })
  createdAt: Date

  @Expose()
  @Column({
    type: 'json',
    name: 'content',
  })
  isScheduled: MailData

  @Expose()
  @Column({
    type: 'boolean',
    name: 'has_been_send',
    default: false,
  })
  hasBeenSend: boolean

  @Expose()
  @Column({
    type: 'boolean',
    name: 'has_been_rescheduled',
    default: false,
  })
  hasBeenRescheduled: boolean
}
