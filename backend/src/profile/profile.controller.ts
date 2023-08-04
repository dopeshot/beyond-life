import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
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
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import { RequestWithJWTPayload } from 'src/shared/interfaces/request-with-user.interface'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { ChangeEmailDTO } from './dtos/change-email.dto'
import { ChangePasswordDto } from './dtos/change-password.dto'
import { ProfileService } from './profile.service'

@Controller('profile')
@ApiTags('profile')
@ApiBearerAuth('access_token')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard, ThrottlerGuard)
@SerializeOptions({ strategy: 'excludeAll' })
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('change-password')
  // OK because 201 would be kind of out of place
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Change password',
  })
  @ApiBody({
    type: ChangePasswordDto,
  })
  @ApiOkResponse({
    description: 'Password has been updated',
  })
  @ApiUnauthorizedResponse({
    description:
      'Either jwt was invalid, old password was wrong or user does not exist anymore',
  })
  @ApiBadRequestResponse({
    description: 'Provided body did not comply to specs of DTO',
  })
  async updatePassword(
    @Req() { user }: RequestWithJWTPayload,
    @Body() { oldPassword, password }: ChangePasswordDto,
  ) {
    await this.profileService.updatePassword(user.id, oldPassword, password)
  }

  @Patch('change-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Change a users email address and therefore also send a new verify mail',
  })
  @ApiBody({ type: ChangeEmailDTO })
  @ApiOkResponse({ description: 'Email has been updated.' })
  @ApiUnauthorizedResponse({
    description: 'Jwt invalid or user does not exist',
  })
  @ApiInternalServerErrorResponse({
    description: 'Db write could not performed or other internal error',
  })
  @ApiBadRequestResponse({
    description: 'Provided body did not comply to specs of DTO',
  })
  async updateUserEmail(
    @Req() { user }: RequestWithJWTPayload,
    @Body() { email }: ChangeEmailDTO,
  ) {
    await this.profileService.updateUserEmail(user.id, email)
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete the users account and related last wills',
  })
  @ApiOkResponse({
    description: 'Account was deleted',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or expired JWT',
  })
  async deleteUser(@Req() { user }: RequestWithJWTPayload) {
    await this.profileService.deleteProfile(user.id)
  }
}
