import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './attributes.entity';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { Setting } from '../settings/settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, Setting])],
  providers: [AttributesService],
  controllers: [AttributesController],
})
export class AttributesModule {}
