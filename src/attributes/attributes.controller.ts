import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { Attribute } from './attributes.entity';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('attribute')
@ApiBearerAuth()
export class AttributesController {
  constructor(private service: AttributesService) {}

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() createAttribute: CreateAttributeDto) {
    return await this.service.create(createAttribute);
  }

  @Put()
  async update(@Body() updateAttribute: Attribute) {
    return await this.service.update(updateAttribute);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
