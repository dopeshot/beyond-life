import { AuthGuard } from '@nestjs/passport'

/**
 * @description Guard used for validating refresh token
 */
export class PasswordResetTokenGuard extends AuthGuard('password-reset-jwt') {}
