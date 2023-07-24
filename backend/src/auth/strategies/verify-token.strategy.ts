import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../db/services/user.service'
import { VerifyJWTPayload } from '../interfaces/verify-jwt-payload.interface'

/**
 * @description Strategy for validating tokens for mail verificiation
 */
@Injectable()
export class VerifyTokenStrategy extends PassportStrategy(
  Strategy,
  'verify-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      secretOrKey: configService.get<string>('JWT_VERIFY_SECRET'),
    })
  }

  async validate(payload: VerifyJWTPayload) {
    return payload
  }
}
