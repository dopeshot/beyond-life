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
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LastWill, LastWillMetadata } from '../db/entities/lastwill.entity'
import { LastWillDBService } from '../db/services/lastwill.service'
import { JwtGuard } from '../shared/guards/jwt.guard'
import { RequestWithJWTPayload } from '../shared/interfaces/request-with-user.interface'
import { CreateLastWillDto } from './dto/create-lastwill.dto'
import { GeneratedLastWillDTO } from './dto/generated-lastwill.dto'
import { UpdateLastWillDto } from './dto/update-lastwill.dto'
import { LastWillService } from './lastwill.service'

@UseGuards(JwtGuard)
@ApiTags('lastwill')
@Controller('lastwill')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
@ApiBearerAuth('access_token')
export class LastWillController {
  constructor(
    private readonly lastWillDBService: LastWillDBService,
    private readonly lastWillService: LastWillService,
  ) {}

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
  @ApiOperation({ summary: 'Create last will' })
  async createOne(
    @Body() createLastWillDto: CreateLastWillDto,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const createdLastWill = await this.lastWillService.createLastWill(
      createLastWillDto,
      user.id,
    )
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
  @ApiOperation({ summary: 'Find all last wills metadata for user' })
  async findAllMetadataByUser(@Req() { user }: RequestWithJWTPayload) {
    const metadataArray = await this.lastWillDBService.findAllByUser(user.id)
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
  @ApiOperation({ summary: 'Find last will of user by id' })
  async findFullById(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const fullLastWill = await this.lastWillDBService.findFullById(id, user.id)
    return new LastWill(fullLastWill)
  }

  @Get(':id/fulltext')
  @ApiOperation({ summary: 'Get Testament as fulltext' })
  @ApiOkResponse({
    description: 'Last will',
    type: GeneratedLastWillDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT is invalid or expired',
  })
  @ApiNotFoundResponse({
    description: 'No last will with this id has been found for the user',
  })
  async getFullTextLastWill(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ): Promise<GeneratedLastWillDTO> {
    const fulltextLastWill = await this.lastWillService.getFullTextLastWill(
      id,
      user.id,
    )
    return new GeneratedLastWillDTO(fulltextLastWill)
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated last will', type: LastWill })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update last will' })
  @ApiBadRequestResponse({
    description: 'Bad request: Invalid data provided',
  })
  @ApiOperation({ summary: 'Update/Replace last will' })
  async updateOneById(
    @Param('id') id: string,
    @Body() updateLastWillDto: UpdateLastWillDto,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    const updatedLastWill = await this.lastWillDBService.updateOneById(
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
  @ApiOperation({ summary: 'Delete one last will by id for user' })
  async deleteOneById(
    @Param('id') id: string,
    @Req() { user }: RequestWithJWTPayload,
  ) {
    await this.lastWillDBService.deleteOneById(id, user.id)
  }
}
