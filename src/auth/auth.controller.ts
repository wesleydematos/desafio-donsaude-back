import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto, AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() authDto: AuthDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(authDto);
  }
}
