import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/UserDto';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repo.findOne({ where: { username: username } });
  }

  async checkLogin(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.findByUsername(username);
    if (user == undefined) {
      return undefined;
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return undefined;
  }

  async signUp(userCreate: UserDto, isAdmin: boolean): Promise<User> {
    const user = new User();
    user.username = userCreate.username;
    user.password = await bcrypt.hash(userCreate.password, saltOrRounds);
    user.isAdmin = isAdmin;
    try {
      await this.repo.insert(user);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Duplicate Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
