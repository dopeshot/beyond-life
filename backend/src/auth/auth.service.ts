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
import { compare } from 'bcrypt'
import { ObjectId } from 'mongoose'
import { MailData } from '../db/entities/mail-event.entity'
import { User } from '../db/entities/users.entity'
import { UserDBService } from '../db/services/user.service'
import {
  MailTemplateContent,
  MailTemplates,
  PasswordResetMailData,
  VerifyMailData,
} from '../mail/interfaces/mail.interface'
import { MailScheduleService } from '../mail/services/scheduler.service'
import { JWTPayload } from '../shared/interfaces/jwt-payload.interface'
import { LoginDTO } from './dtos/login.dto'
import { RegisterDTO } from './dtos/register.dto'
import { PasswordResetJWTPayload } from './interfaces/pw-reset-jwt-payload.interface'
import { RefreshJWTPayload } from './interfaces/refresh-jwt-payload.interface'
import { VerifyJWTPayload } from './interfaces/verify-jwt-payload.interface'
import { TokenResponse } from './responses/token.response'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private readonly userService: UserDBService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailScheduleService,
  ) {}

  /**
   * @description Initiate user registration
   */
  async register(body: RegisterDTO): Promise<TokenResponse> {
    // hash password
    const newUser = await this.userService.insertUser(body)
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
        'FRONTEND_DOMAIN',
      )}/account/email-verified?token=${verifyToken}`,
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
      hasVerifiedEmail: user.hasVerifiedEmail,
    } as JWTPayload)
  }

  /**
   * @description Verify users email
   */
  async verifyUserMail(mail: string) {
    const user = await this.userService.findOneByEmail(mail)

    if (!user) {
      throw new NotFoundException('No user with that email address exists')
    }

    if (user.hasVerifiedEmail) {
      throw new ConflictException('This user already verified their email')
    }

    try {
      this.logger.debug(`Verifying user mail`)
      await this.userService.updateUserEmailVerify(mail)
    } catch (error) {
      throw new InternalServerErrorException('Update could not be made')
    }
  }

  /**
   * @description Request that verification email is send to users email address
   */
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

  /**
   * @description Send password reset email
   */
  async startForgottenPasswordFlow(email: string) {
    const user = await this.userService.findOneByEmail(email)

    // No error to prevent mail checking
    if (!user) return

    // Default to case that user does not have a verified email i.e. they have to contact support
    let mailContent: MailTemplateContent = {}
    let mailTemplate = MailTemplates.PASSWORD_RESET_SUPPORT

    if (user.hasVerifiedEmail) {
      const resetToken = this.jwtService.sign(
        {
          id: user._id,
        } as PasswordResetJWTPayload,
        {
          secret: this.configService.get('JWT_PASSWORD_RESET_SECRET'),
          expiresIn: this.configService.get('JWT_PASSWORD_RESET_EXPIRE_TIME'),
        },
      )
      const resetUrl = `${this.configService.get(
        'FRONTEND_DOMAIN',
      )}/account/change-password?token=${resetToken}`

      mailContent = { resetUrl } as PasswordResetMailData
      mailTemplate = MailTemplates.PASSWORD_RESET
    }

    const mailData: MailData = {
      content: {
        subject: 'Email reset',
        templateContent: mailContent,
        contentTemplate: mailTemplate,
      },
      recipient: {
        recipient: email,
      },
    }

    await this.mailService.scheduleMailNow(mailData)
  }

  /**
   * @description Reset user password
   */
  async setNewUserPassword(id: ObjectId, newPassword: string) {
    const user = await this.userService.findOneById(id)
    // This SHOULD never happen => Therefore internal server error
    if (!user) {
      throw new InternalServerErrorException(
        'This user does not seem to exist anymore',
      )
    }
    try {
      await this.userService.updateUserPassword(id, newPassword)
    } catch (error) {
      this.logger.warn(
        `Could not update a user password due to an error ${error}`,
      )
      throw new ServiceUnavailableException(
        'Password could not be set, please try again later',
      )
    }
  }
}
