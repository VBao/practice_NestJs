import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Setting } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private repo: Repository<Setting>,
  ) {}

  async findAll(): Promise<Setting[]> {
    return await this.repo.find();
  }

  async findById(id: string): Promise<Setting> {
    return await this.repo.findOne(id);
  }

  async create(setting: Setting) {
    try {
      await this.repo.create(setting);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Duplicate Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(setting: Setting): Promise<boolean> {
    const update = await this.repo.findOne(setting.attributeId);
    if (update != null) {
      await this.repo.save(setting);
      return true;
    } else {
      return false;
    }
  }

  async delete(id: string) {
    await this.repo.delete(id);
  }
}
