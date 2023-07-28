import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum } from 'class-validator'

export class PaymentDTO {
  @IsEnum(['single', 'family'])
  @ApiProperty({
    enum: ['single', 'family'],
    description: 'Payment plan',
    example: 'single',
  })
  plan: PaymentOptions
}

export type PaymentOptions = 'single' | 'family'
type CheckoutStatus = 'free' | 'pending' | 'paid' | 'failed'

export type CheckoutInformation = {
  status: CheckoutStatus
  lastInformationTime: number
}

type Plans = {
  [key in PaymentOptions & 'free']: number
}

// Level of cost, used to determine if a user wants to falsly downgrade (yes could be an Enum but we don't want those due to TS shenanigans)
export const paymentPlans: Plans = {
  free: -1,
  single: 1,
  family: 5,
}

export class PaymentResponse {
  @ApiProperty({
    description: 'Payment status',
    example: 'succeeded',
  })
  @Expose()
  status: string

  @ApiProperty({
    description: 'Amount received',
    example: 4900,
  })
  @Expose()
  amount_received: number

  constructor(partial: Partial<PaymentResponse>) {
    Object.assign(this, partial)
  }
}
