import { Schema } from 'mongoose'

/**
 * @description Contents of the refresh JWT
 */
export interface RefreshJWTPayload {
  /**
   * @description Userid
   */
  id: Schema.Types.ObjectId
  /**
   * @description User email
   */
  email: string
}
