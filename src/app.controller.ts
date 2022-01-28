import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserDto } from './users/dto/UserDto';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() req: UserDto) {
    const user = await this.authService.validateUser(
      req.username,
      req.password,
    );
    if (user == null) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Please check username and password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.authService.login(user);
  }

  @Post('auth/signup')
  async signup(@Body() req: UserDto): Promise<any> {
    return await this.authService.signup(req);
  }
}
