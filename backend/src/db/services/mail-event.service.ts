import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryFailedError, Repository } from 'typeorm'
import { UserEntity } from '../entities/users.entity'

@Injectable()
export class MailEventService {
  private readonly logger = new Logger(MailEventService.name)

  constructor(
    @InjectRepository(MailEventService)
    private readonly mailEventEntity: Repository<MailEventService>,
  ) {}
}
