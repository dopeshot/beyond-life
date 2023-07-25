import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../db/services/user.service'
import { PasswordResetJWTPayload } from '../interfaces/pw-reset-jwt-payload.interface'

/**
 * @description Strategy for validating long living refresh tokens
 */
@Injectable()
export class PasswordResetTokenStrategy extends PassportStrategy(
  Strategy,
  'password-reset-jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      secretOrKey: configService.get<string>('JWT_PASSWORD_RESET_SECRET'),
    })
  }

  async validate(payload: PasswordResetJWTPayload) {
    return payload
  }
}
