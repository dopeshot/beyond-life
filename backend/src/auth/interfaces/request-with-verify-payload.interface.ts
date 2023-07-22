import { VerifyJWTPayload } from './verify-jwt-payload.interface'

/**
 * @description Interface for request verify jwt content attached
 */
export interface RequestWithVerifyContent extends Request {
  /**
   * @description Attached user entity
   */
  user: VerifyJWTPayload
}
