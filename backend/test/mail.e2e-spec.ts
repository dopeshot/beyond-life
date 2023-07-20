import { ScheduleModule } from '@nestjs/schedule'
import { MailModule } from '../src/mail/mail.module'
import { DbModule } from '../src/db/db.module'
import { Test, TestingModule } from '@nestjs/testing'
import { DataSource } from 'typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { setupDataSource } from './helpers/db.helper'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { MockConfigService } from './helpers/config-service.helper'
import { MailScheduleService } from '../src/mail/services/scheduler.service'
import { MailData } from '../src/mail/interfaces/mail.interface'
import {
  getMailEventsByAttribute,
  insertMailEvent,
} from './helpers/mail-events.helper'
import { NodemailerMock } from 'nodemailer-mock'
import * as nodemailer from 'nodemailer'
import { MailEventEntity } from '../src/db/entities/mail-event.entity'
import { AppModule } from '../src/app.module'
const { mock } = nodemailer as unknown as NodemailerMock

describe('MailModule', () => {
  let app: INestApplication
  let dataSource: DataSource
  let mailScheduleService: MailScheduleService

  beforeEach(async () => {
    dataSource = await setupDataSource()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    app = await moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    mailScheduleService = app.get<MailScheduleService>(MailScheduleService)

    await app.init()
  })

  afterEach(async () => {
    mock.reset()
    await app.close()
  })

  describe('schedule mail', () => {
    it('Should allow scheduling mails', async () => {
      // ARRANGE
      const scheduleDate = new Date(Date.now() + 5 * 60000)
      const mailData: MailData = {
        recipient: {
          recipient: 'test@test.test',
        },
        content: {
          subject: 'test',
          contentRaw: 'this is raw content',
        },
      }
      // ACT
      await mailScheduleService.scheduleMailAtDate(scheduleDate, mailData)
      // ASSERT
      expect((await getMailEventsByAttribute(dataSource)).length).toEqual(1)
      const mailEvent = (await getMailEventsByAttribute(dataSource))[0]
      expect(mailEvent.content).toEqual(mailData)
      expect(new Date(mailEvent.scheduledAt).getTime()).toEqual(
        scheduleDate.getTime(),
      )
      expect(mailEvent.hasBeenSend).toEqual(false)
    })
  })

  describe('send mail', () => {
    describe('Positive Tests', () => {
      it('should send mail', async () => {
        // ARRANGE
        const mailData: MailData = {
          recipient: {
            recipient: 'test@test.test',
          },
          content: {
            subject: 'test',
            contentRaw: 'this is raw content',
          },
        }
        // ACT
        await mailScheduleService.scheduleMailNow(mailData)
        // ASSERT
        expect(mock.getSentMail().length).toEqual(1)
      })
    })
    describe('Negative Tests', () => {
      // Pass
    })
  })

  describe('(Croun) should send scheduled mails', () => {
    describe('Positive Tests', () => {
      it('should send scheduled mails', async () => {
        // ARRANGE
        const mailData: MailData = {
          recipient: {
            recipient: 'test@test.test',
          },
          content: {
            subject: 'test',
            contentRaw: 'this is raw content',
          },
        }
        const mailEventEntityData: Partial<MailEventEntity> = {
          content: mailData,
          scheduledAt: new Date(),
          hasBeenRescheduled: false,
          hasBeenSend: false,
        }
        await insertMailEvent(dataSource, mailEventEntityData)
        // ACT
        await mailScheduleService.sendScheduledMails()
        // ASSERT
        expect(mock.getSentMail().length).toEqual(1)
        const alteredMailEvent = (await getMailEventsByAttribute(dataSource))[0]
        expect(alteredMailEvent.hasBeenSend).toEqual(true)
      })
    })
  })
})
