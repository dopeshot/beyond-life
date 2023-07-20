import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hash as bhash, compare } from 'bcrypt'
import { JWTPayload } from '../shared/interfaces/jwt-payload.interface'
import { LoginDTO } from './dtos/login.dto'
import { RefreshJWTPayload } from './interfaces/refresh-jwt-payload.interface'
import { RegisterDTO } from './dtos/register.dto'
import { TokenResponse } from './responses/token.response'
import { UserService } from '../db/services/user.service'
import { User } from '../db/entities/users.entity'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @description Initiate user registration
   */
  async register(body: RegisterDTO): Promise<TokenResponse> {
    // hash password
    const hash = await bhash(body.password, 10)
    const newUser = await this.userService.insertUser({
      ...body,
      password: hash,
    })
    /* istanbul ignore if */
    if (!newUser) {
      this.logger.error(
        'An unexpected error occured. Creation of user did not fail but also did not return user',
      )
      // All conflict related exceptions are thrown within the userService
      // This is only a safeguard that should never be reached (in theory)
      throw new InternalServerErrorException()
    }
    return await this.getAuthPayload(newUser)
  }

  /**
   * @description Initiate user login
   */
  async login(body: LoginDTO): Promise<TokenResponse> {
    let user: User
    try {
      user = await this.userService.findOneByEmail(body.email)
    } catch (error) /* istanbul ignore next */ {
      this.logger.error(error)
      if (error instanceof HttpException) {
        throw error
      }
      throw new InternalServerErrorException()
    }
    if (!user || !(await compare(body.password, user.password))) {
      this.logger.warn(`Attempted but invalid login for user ${body.email}`)
      throw new UnauthorizedException()
    }
    return await this.getAuthPayload(user)
  }

  /**
   * @description Generate tokens
   */
  async getAuthPayload(user: User): Promise<TokenResponse> {
    await this.userService.setLoginTimestamp(user._id)
    return {
      access_token: await this.generateJWTToken(user),
      refresh_token: await this.generateRefreshToken(user),
    }
  }

  /**
   * @description Generate refresh token for passed user
   */
  private async generateRefreshToken(user: User): Promise<string> {
    return await this.jwtService.sign(
      {
        id: user._id,
        email: user.email,
      } as RefreshJWTPayload,
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRE_TIME'),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    )
  }

  /**
   * @description Generate access token for passed user
   */
  private async generateJWTToken(user: User): Promise<string> {
    return this.jwtService.sign({
      id: user._id,
      email: user.email,
    } as JWTPayload)
  }
}
