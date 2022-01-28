import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Attribute } from './attributes.entity';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { Setting } from '../settings/settings.entity';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  async findAll(): Promise<Attribute[]> {
    return await this.attributeRepository.find();
  }

  async findById(id: string): Promise<Attribute> {
    return await this.attributeRepository.findOne(id);
  }

  async create(attribute: CreateAttributeDto) {
    const createAttribute = new Attribute();
    createAttribute.code = attribute.code;
    createAttribute.description = attribute.description;
    createAttribute.parent = attribute.parent;
    createAttribute.shortName = attribute.shortName;
    createAttribute.effectiveDate = attribute.effectiveDate;
    createAttribute.validUntil = null;
    const setting = await this.settingRepository.findOne(attribute.setting);
    createAttribute.setting = setting;
    try {
      await this.attributeRepository.insert(createAttribute);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Duplicate Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return createAttribute;
  }

  async update(attribute: Attribute): Promise<boolean> {
    const update = await this.attributeRepository.findOne(attribute.code);
    if (update != null) {
      try {
        await this.attributeRepository.update(
          { code: attribute.code },
          attribute,
        );
      } catch (e) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Duplicate Id',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return true;
    } else {
      return false;
    }
  }

  async delete(code: string) {
    await this.attributeRepository.delete(code);
  }
}
