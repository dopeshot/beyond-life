import { Module } from '@nestjs/common'
import { PermissionGroupsService } from './permission-groups.service'

@Module({
  providers: [PermissionGroupsService],
})
export class PermissionGroupsModule {}
