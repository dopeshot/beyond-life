import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LastWillsService } from './last-wills.service';
import { CreateLastWillDto } from './dto/create-last-will.dto';
import { UpdateLastWillDto } from './dto/update-last-will.dto';

@Controller('last-wills')
export class LastWillsController {
  constructor(private readonly lastWillsService: LastWillsService) {}

  @Post()
  create(@Body() createLastWillDto: CreateLastWillDto) {
    return this.lastWillsService.create(createLastWillDto);
  }

  @Get()
  findAll() {
    return this.lastWillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lastWillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLastWillDto: UpdateLastWillDto) {
    return this.lastWillsService.update(+id, updateLastWillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lastWillsService.remove(+id);
  }
}
