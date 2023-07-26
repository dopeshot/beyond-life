import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateLastWillDto } from './dto/create-lastwill.dto'
import { UpdateLastWillDto } from './dto/update-lastwill.dto'
import { LastWillsService } from './lastwills.service'

@Controller('lastwill')
export class LastWillsController {
  constructor(private readonly lastWillsService: LastWillsService) {}

  @Post()
  createOne(@Body() createLastWillDto: CreateLastWillDto) {
    return this.lastWillsService.createOne(createLastWillDto)
  }

  @Get(':userid')
  findAllMetadataByUser() {
    return this.lastWillsService.findAllMetadataByUser()
  }

  @Get(':userid/:willid')
  findFullById(@Param('id') id: string) {
    return this.lastWillsService.findFullById(+id)
  }

  @Patch(':willid')
  updateOneById(
    @Param('id') id: string,
    @Body() updateLastWillDto: UpdateLastWillDto,
  ) {
    return this.lastWillsService.updateOneById(+id, updateLastWillDto)
  }

  @Delete(':willid')
  deleteOneById(@Param('id') id: string) {
    return this.lastWillsService.deleteOneById(+id)
  }
}
