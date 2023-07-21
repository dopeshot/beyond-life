import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { RequestWithJWTPayload } from 'src/shared/interfaces/request-with-user.interface'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { ChangePasswordDto } from './dtos/change-password.dto'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('change-password')
  @UseGuards(JwtGuard)
  // OK because 201 would be kind of out of place
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Req() { user }: RequestWithJWTPayload,
    @Body() { oldPassword, password }: ChangePasswordDto,
  ) {
    await this.profileService.updatePassword(user.id, oldPassword, password)
  }
}
