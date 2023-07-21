import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hash as bhash, compare } from 'bcrypt'
import { ObjectId } from 'mongoose'
import { MailData } from '../db/entities/mail-event.entity'
import { User } from '../db/entities/users.entity'
import { UserService } from '../db/services/user.service'
import {
  MailTemplates,
  VerifyMailData,
} from '../mail/interfaces/mail.interface'
import { MailScheduleService } from '../mail/services/scheduler.service'
import { JWTPayload } from '../shared/interfaces/jwt-payload.interface'
import { LoginDTO } from './dtos/login.dto'
import { RegisterDTO } from './dtos/register.dto'
import { RefreshJWTPayload } from './interfaces/refresh-jwt-payload.interface'
import { VerifyJWTPayload } from './interfaces/verify-jwt-payload.interface'
import { TokenResponse } from './responses/token.response'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailScheduleService,
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

    try {
      await this.sendEmailVerify(newUser)
    } catch (error) {
      this.logger.warn(
        `Sending verify mail failed due to an error. User registration continued anyway ${error}`,
      )
    }

    return await this.getAuthPayload(newUser)
  }

  /**
   *
   * @description Send verification email for user
   */
  private async sendEmailVerify(user: User) {
    const verifyToken = this.jwtService.sign(
      {
        email: user.email,
      } as VerifyJWTPayload,
      {
        secret: this.configService.get('JWT_VERIFY_SECRET'),
        expiresIn: this.configService.get('JWT_VERIFY_EXPIRE_TIME'),
      },
    )

    const mailContent: VerifyMailData = {
      verifyUrl: `${this.configService.get(
        'BACKEND_DOMAIN',
      )}/auth/verify-email?token=${verifyToken}`,
    }
    const mail: MailData = {
      recipient: {
        recipient: user.email,
      },
      content: {
        subject: 'Email verifizieren',
        templateContent: mailContent,
        contentTemplate: MailTemplates.VERIFY,
      },
    }

    await this.mailService.scheduleMailNow(mail)
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

  async verifyUserMail(mail: string) {
    const user = await this.userService.findOneByEmail(mail)

    if (!user) {
      throw new NotFoundException('No user with that email address exists')
    }

    if (user.hasVerifiedEmail) {
      throw new ConflictException('This user already verified their email')
    }

    try {
      await this.userService.updateUserEmailVerify(mail)
    } catch (error) {
      throw new InternalServerErrorException('Update could not be made')
    }
  }

  async requestUserVerifyMail(id: ObjectId) {
    const user = await this.userService.findOneById(id)
    // This should never happen, however it is a valid failsave
    if (!user) {
      throw new NotFoundException('No user')
    }

    // Dont do anything here, throwing an error is more confusing than helpful
    if (user.hasVerifiedEmail) {
      return
    }
    try {
      await this.sendEmailVerify(user)
    } catch (error) {
      throw new ServiceUnavailableException(
        'Mail could not be send as of now. Please try again later',
      )
    }
  }
}
