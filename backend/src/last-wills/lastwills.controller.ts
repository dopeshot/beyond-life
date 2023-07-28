import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { LastWill } from '../db/entities/lastwill.entity'
import { LastWillsService } from '../db/services/lastwills.service'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { RequestWithJWTPayload } from '../shared/interfaces/request-with-user.interface'
import { CreateLastWillDto } from './dto/create-lastwill.dto'
import { UpdateLastWillDto } from './dto/update-lastwill.dto'

@UseGuards(JwtGuard)
@ApiTags('lastwill')
@Controller('lastwill')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
@ApiBearerAuth('access-token')
export class LastWillsController {
  constructor(private readonly lastWillsService: LastWillsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The last will has been successfully created.',
    type: LastWill,
  })
  async createOne(
    @Body() createLastWillDto: CreateLastWillDto,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const createdLastWill = await this.lastWillsService.createOne(
      createLastWillDto,
      user.id,
    )
    return new LastWill(createdLastWill)
  }

  @Get()
  async findAllMetadataByUser(@Req() { user }: RequestWithJWTPayload) {
    // TODO: use Serializer to only send relevant metadata
    const metadataArray = await this.lastWillsService.findAllMetadataByUser(
      user.id,
    )
  }

  @Get(':id')
  async findFullById(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const fullLastWill = await this.lastWillsService.findFullById(id, user.id)
  }

  @Get(':id/fulltext')
  async getFullTextLastWill(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const fulltextLastWill = await this.lastWillsService.getFullTextLastWill(
      id,
      user.id,
    )
  }

  @Put(':id')
  async updateOneById(
    @Param('id') id: string,
    @Body() updateLastWillDto: UpdateLastWillDto,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const updatedLastWill = await this.lastWillsService.updateOneById(
      id,
      user.id,
      updateLastWillDto,
    )
  }

  @Delete(':id')
  async deleteOneById(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    await this.lastWillsService.deleteOneById(id, user.id)
  }
}