import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { RequestWithJWTPayload } from 'src/shared/interfaces/request-with-user.interface'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { ChangePasswordDto } from './dtos/change-password.dto'
import { ProfileService } from './profile.service'

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('change-password')
  @UseGuards(JwtGuard)
  // OK because 201 would be kind of out of place
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Change password',
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
  async updatePassword(
    @Req() { user }: RequestWithJWTPayload,
    @Body() { oldPassword, password }: ChangePasswordDto,
  ) {
    await this.profileService.updatePassword(user.id, oldPassword, password)
  }
}
