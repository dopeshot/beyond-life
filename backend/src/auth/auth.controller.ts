import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { RequestWithJWTPayload } from '../shared/interfaces/request-with-user.interface'
import { AuthService } from './auth.service'
import { ForgotPasswordDTO } from './dtos/forgot-password.dto'
import { LoginDTO } from './dtos/login.dto'
import { RegisterDTO } from './dtos/register.dto'
import { SubmitNewPasswordDTO } from './dtos/submit-new-password.dto'
import { PasswordResetTokenGuard } from './guards/pw-reset-token.guard'
import { RefreshTokenGuard } from './guards/refresh-token.guard'
import { VerifyTokenGuard } from './guards/verify-token.guard'
import { RequestWithPasswordResetPayload } from './interfaces/request-with-pw-reset-jwt-payload.interface'
import { RequestWithDbUser } from './interfaces/request-with-refresh-payload.interface'
import { RequestWithVerifyContent } from './interfaces/request-with-verify-payload.interface'
import { TokenResponse } from './responses/token.response'

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDTO })
  @ApiOperation({ summary: 'Register new user' })
  @ApiConflictResponse({
    description: 'User properties already in use',
  })
  @ApiBadRequestResponse({
    description: 'Malformed dto passed',
  })
  @ApiCreatedResponse({
    description: 'User has been created',
    type: TokenResponse,
  })
  async register(@Body() registerData: RegisterDTO): Promise<TokenResponse> {
    return new TokenResponse(await this.authService.register(registerData))
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDTO })
  @ApiOperation({ summary: 'Login existing user' })
  @ApiUnauthorizedResponse({
    description: 'User credentials are invalid/User has been banned',
  })
  @ApiOkResponse({
    description: 'Authorized',
    type: TokenResponse,
  })
  async login(@Body() loginData: LoginDTO): Promise<TokenResponse> {
    return new TokenResponse(await this.authService.login(loginData))
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Fetch new access token using refresh token' })
  @ApiBearerAuth('refresh_token')
  @ApiOkResponse({
    description: 'Valid refresh token.',
    type: TokenResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid refresh token',
  })
  async getAuthViaRefreshToken(
    @Req() { user }: RequestWithDbUser,
  ): Promise<TokenResponse> {
    return new TokenResponse(await this.authService.getAuthPayload(user))
  }

  @Get('verify-email')
  @UseGuards(VerifyTokenGuard)
  @ApiOperation({ summary: 'Verify a users email' })
  @ApiQuery({ name: 'token', description: 'Verify jwt token', type: String })
  @ApiOkResponse({
    description: 'Email has been verified',
  })
  @ApiNotFoundResponse({
    description: 'User with that email has not been found',
  })
  @ApiConflictResponse({
    description: 'User`s email has already been verified',
  })
  async verifyMail(@Req() { user }: RequestWithVerifyContent) {
    await this.authService.verifyUserMail(user.email)
  }

  @Get('request-verify-email')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Request a verfication email for the users email address',
  })
  @ApiBearerAuth('access_token')
  @ApiOkResponse({
    description: 'Verify email has been send',
  })
  @ApiServiceUnavailableResponse({
    description: 'Email server could not be reached',
  })
  @ApiNotFoundResponse({
    description: 'Specified user could not be found (this SHOULD never happen)',
  })
  async requestVerifyMail(@Req() { user }: RequestWithJWTPayload) {
    await this.authService.requestUserVerifyMail(user.id)
  }

  @Post('forgot-password')
  @ApiOperation({ description: 'Request a password reset email' })
  @ApiCreatedResponse({ description: 'Password reset email has been send' })
  @ApiBody({
    type: ForgotPasswordDTO,
  })
  @ApiServiceUnavailableResponse({
    description: ' Mail could not be send',
  })
  async startForgottenPasswordFlow(@Body() { email }: ForgotPasswordDTO) {
    await this.authService.startForgottenPasswordFlow(email)
  }

  @Post('forgot-password-submit')
  @UseGuards(PasswordResetTokenGuard)
  @ApiOperation({
    description: 'Submit new password for user',
  })
  @ApiUnauthorizedResponse({
    description: 'Token was invalid or has expired',
  })
  @ApiCreatedResponse({
    description: 'Password has been updated',
  })
  @ApiServiceUnavailableResponse({
    description: 'Password could not be updated',
  })
  @ApiBearerAuth('password_reset_token')
  async setNewPassword(
    @Req() { user }: RequestWithPasswordResetPayload,
    @Body() { password }: SubmitNewPasswordDTO,
  ) {
    await this.authService.setNewUserPassword(user.id, password)
  }
}
