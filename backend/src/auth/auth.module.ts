import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { DbModule } from '../db/db.module'
import { SharedModule } from '../shared/shared.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy'
import { VerifyTokenStrategy } from './strategies/verify-token.strategy'

@Module({
  imports: [DbModule, SharedModule, PassportModule],
  providers: [AuthService, RefreshTokenStrategy, VerifyTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
