import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserDBService } from '../../db/services/user.service'
import { RefreshJWTPayload } from '../interfaces/refresh-jwt-payload.interface'

/**
 * @description Strategy for validating long living refresh tokens
 */
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserDBService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    })
  }

  async validate(payload: RefreshJWTPayload) {
    const user = await this.userService.findOneById(payload.id)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
