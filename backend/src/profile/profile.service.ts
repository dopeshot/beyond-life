import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { ObjectId } from 'mongoose'
import { UserService } from '../db/services/user.service'

@Injectable()
export class ProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async updatePassword(id: ObjectId, oldPassword: string, newPassword: string) {
    // Verify that old password is right
    const user = await this.userService.findOneById(id)

    if (!user || !(await compare(oldPassword, user.password))) {
      throw new UnauthorizedException(
        'This is not allowed...either you do not exist or the provided password was invalid',
      )
    }
    await this.userService.updateUserPassword(id, newPassword)
  }
}
