import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Severity, prop } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'
import { ObjectId } from 'mongoose'
import { CheckoutInformation } from '../../payments/interfaces/payments'

/**
 * @description Entity with all user information
 */
export class User {
  _id: ObjectId

  @Expose({ groups: ['self'] })
  @prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Email of the user. Only exposed to self',
    example: 'test@test.test',
  })
  email: string

  @Exclude()
  @prop({ required: true })
  password: string

  @Expose({ groups: ['self'] })
  @prop()
  @ApiPropertyOptional({
    description: 'Last login for the user. Only exposed to self',
    example: Date.now(),
  })
  lastLogin: Date | null

  @Expose()
  @prop()
  @ApiPropertyOptional({
    description: 'Creation date of user',
    example: Date.now(),
  })
  createdAt: Date

  @Expose()
  @prop({ required: true, default: false })
  @ApiProperty({
    description: 'Has the users mail been verified?',
  })
  hasVerifiedEmail: boolean

  @Expose()
  @prop({ required: true, default: 'free' })
  @ApiPropertyOptional({
    description: 'Payment plan of the user',
    example: 'free',
    enum: ['free', 'single', 'family'],
  })
  paymentPlan: string

  @Expose()
  @prop({
    required: true,
    default: { status: 'free', lastInformationTime: 0 },
    allowMixed: Severity.ALLOW,
  })
  @ApiPropertyOptional({
    description: 'Checkout status',
    example: { status: 'free', lastInformationTime: 0 },
  })
  checkoutInformation: CheckoutInformation

  @Expose()
  @prop({ required: false })
  @ApiPropertyOptional({
    description: 'Stripe customer id',
    example: 'cus_...',
  })
  stripeCustomerId: string
  /*

  _koooHELLOoobbbiii
  kkDIDuCheckThisbiii
  kkooTellUsoobbbiii
  koobii
  _kobi

  */
}
