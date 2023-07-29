import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LastWill, LastWillMetadata } from '../db/entities/lastwill.entity'
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
@ApiBearerAuth('access_token')
export class LastWillsController {
  constructor(private readonly lastWillsService: LastWillsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The last will has been successfully created',
    type: LastWill,
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized: Either not logged in or already too many last wills',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: Invalid data provided',
  })
  async createOne(
    @Body() createLastWillDto: CreateLastWillDto,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const createdLastWill = await this.lastWillsService.createOne(
      createLastWillDto,
      user.id,
    )
    console.log(createdLastWill)
    return new LastWill(createdLastWill)
  }

  @Get()
  @ApiOkResponse({
    description: 'Lastwills metadata array',
    type: LastWillMetadata,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized to get last wills metadata',
  })
  async findAllMetadataByUser(@Req() { user }: RequestWithJWTPayload) {
    const metadataArray = await this.lastWillsService.findAllByUser(user.id)
    return metadataArray.map(
      (metadata) =>
        new LastWillMetadata({
          ...metadata,
          testator: metadata.testator.name,
        }),
    )
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Full last will', type: LastWill })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get last will' })
  @ApiNotFoundResponse({ description: 'Last will not found' })
  async findFullById(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const fullLastWill = await this.lastWillsService.findFullById(id, user.id)
    console.log(fullLastWill)
    return new LastWill(fullLastWill)
  }

  // TODO: implement in other issue
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
  @ApiOkResponse({ description: 'Updated last will', type: LastWill })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update last will' })
  @ApiBadRequestResponse({
    description: 'Bad request: Invalid data provided',
  })
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
    return new LastWill(updatedLastWill)
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Last will deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete last will' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneById(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    await this.lastWillsService.deleteOneById(id, user.id)
  }
}
