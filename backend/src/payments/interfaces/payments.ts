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

export const paymentPlans: Plans = {
  free: 0,
  single: 4900,
  family: 14900,
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
