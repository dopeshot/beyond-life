import { Schema } from 'mongoose'

/**
 * @description DTO for JWT Token content
 */
export interface JWTPayload {
  id: Schema.Types.ObjectId
  email: string
  hasVerifiedEmail: boolean
  paymentPlan: string
}
