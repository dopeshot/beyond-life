import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  INestApplication,
  ServiceUnavailableException,
  ValidationPipe,
} from '@nestjs/common'
import { MockConfigService } from './helpers/config-service.helper'
import { MailScheduleService } from '../src/mail/services/scheduler.service'
import { NodemailerMock } from 'nodemailer-mock'
import * as nodemailer from 'nodemailer'
import { MailData, MailEvent } from '../src/db/entities/mail-event.entity'
import { Connection, Model } from 'mongoose'
import { getConnectionToken } from '@m8a/nestjs-typegoose'
import {
  closeInMongodConnection,
  rootTypegooseTestModule,
} from './helpers/mongo.helper'
import { MailModule } from '../src/mail/mail.module'
const { mock } = nodemailer as unknown as NodemailerMock

describe('MailModule', () => {
  let app: INestApplication
  let connection: Connection
  let mailEventModel: Model<MailEvent>
  let mailScheduleService: MailScheduleService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        rootTypegooseTestModule(),
        MailModule.forRoot({ transport: {} as any, defaultSender: '' }),
      ],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile()

    app = await moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    mailScheduleService = app.get<MailScheduleService>(MailScheduleService)
    connection = await app.get(getConnectionToken())
    mailEventModel = connection.model<MailEvent>('MailEvent')

    await app.init()
  })

  afterEach(async () => {
    mock.reset()
    await app.close()
    await closeInMongodConnection()
  })

  describe('Schedule mail', () => {
    it('should allow scheduling mails', async () => {
      // ARRANGE
      const scheduleDate = new Date(Date.now() + 5 * 60000)
      const mailData: MailData = {
        recipient: {
          recipient: 'test@test.test',
          cc: [],
        },
        content: {
          subject: 'test',
          contentRaw: 'this is raw content',
        },
      }
      // ACT
      await mailScheduleService.scheduleMailAtDate(scheduleDate, mailData)
      // ASSERT
      expect((await mailEventModel.find()).length).toEqual(1)
      const mailEvent = (await mailEventModel.find().lean())[0]
      expect(mailEvent.content).toEqual(mailData)
      expect(new Date(mailEvent.scheduledAt).getTime()).toEqual(
        scheduleDate.getTime(),
      )
      expect(mailEvent.hasBeenSent).toEqual(false)
    })
  })

  describe('Send mail', () => {
    describe('Positive Tests', () => {
      it('should send a mail', async () => {
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
      it('should throw ServiceUnavailable if mail not sendable', async () => {
        // ARRANGE
        mock.setShouldFail(true)
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
        await expect(
          mailScheduleService.scheduleMailNow(mailData),
        ).rejects.toThrow(ServiceUnavailableException)
      })
    })
  })

  describe('(Cron) scheduled mails', () => {
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
        const mailEventEntityData: Partial<MailEvent> = {
          content: mailData,
          scheduledAt: new Date(),
          hasBeenRescheduled: false,
          hasBeenSent: false,
        }
        await mailEventModel.create(mailEventEntityData)
        // ACT
        await mailScheduleService.sendScheduledMails()
        // ASSERT
        expect(mock.getSentMail().length).toEqual(1)
      })
      it('should mark mails as sent', async () => {
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
        const mailEventEntityData: Partial<MailEvent> = {
          content: mailData,
          scheduledAt: new Date(),
          hasBeenRescheduled: false,
          hasBeenSent: false,
        }
        await mailEventModel.create(mailEventEntityData)
        // ACT
        await mailScheduleService.sendScheduledMails()
        // ASSERT
        expect(mock.getSentMail().length).toEqual(1)
        const alteredMailEvent = (await mailEventModel.find())[0]
        expect(alteredMailEvent.hasBeenSent).toEqual(true)
      })
    })
    describe('Negatve Tests', () => {
      it('should reschedule mails on failure', async () => {
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
        const mailEventEntityData: Partial<MailEvent> = {
          content: mailData,
          scheduledAt: new Date(),
          hasBeenRescheduled: false,
          hasBeenSent: false,
        }
        await mailEventModel.create(mailEventEntityData)
        mock.setShouldFail(true)
        // ACT
        await mailScheduleService.sendScheduledMails()
        // ASSERT
        const alteredMailEvent = (await mailEventModel.find())[0]
        expect(alteredMailEvent.hasBeenRescheduled).toEqual(true)
        expect(alteredMailEvent.hasBeenSent).toEqual(false)
        expect(alteredMailEvent.scheduledAt.getTime()).toBeGreaterThanOrEqual(
          new Date().getTime(),
        )
      })
    })
  })
})
