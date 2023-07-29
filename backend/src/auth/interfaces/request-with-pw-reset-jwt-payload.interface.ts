import { PasswordResetJWTPayload } from './pw-reset-jwt-payload.interface'

export interface RequestWithPasswordResetPayload extends Request {
  user: PasswordResetJWTPayload
}
