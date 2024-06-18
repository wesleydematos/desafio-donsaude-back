import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthDto, AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Loga na aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Login efetuado',
    type: AuthResponseDto,
  })
  @ApiBody({ type: AuthDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() authDto: AuthDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(authDto);
  }
}
