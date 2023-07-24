import { AuthGuard } from '@nestjs/passport'

/**
 * @description Guard used for validating refresh token
 */
export class VerifyTokenGuard extends AuthGuard('verify-jwt') {}
