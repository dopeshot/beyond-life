import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class PaymentDTO {
  @IsEnum(['single', 'family'])
  @ApiProperty({
    enum: ['single', 'family'],
    description: 'Payment plan',
    example: 'single',
  })
  plan: PaymentOptions

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment Method',
    example: 'idk',
  })
  paymentMethodId: string
}

export type PaymentOptions = 'single' | 'family'

export type Plans = {
  [key in PaymentOptions]: number
}

export const paymentPlans: Plans = {
  single: 4900,
  family: 14900,
}
