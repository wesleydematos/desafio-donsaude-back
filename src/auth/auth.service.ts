import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ColaboratorsService } from 'src/colaborators/colaborators.service';
import { AuthDto, AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly colaboratorsService: ColaboratorsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(authDto: AuthDto): Promise<AuthResponseDto> {
    const foundUser = await this.colaboratorsService.findByEmail(authDto.email);
    const { password, ...colaboratorWithOutPassword } = foundUser;

    if (!foundUser || !compareSync(authDto.password, password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: foundUser.id, email: foundUser.email };

    const token = this.jwtService.sign(payload, {
      expiresIn: this.jwtExpirationTimeInSeconds,
    });

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
      colaborator: colaboratorWithOutPassword,
    };
  }
}
