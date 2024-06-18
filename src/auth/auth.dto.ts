import { ApiProperty } from '@nestjs/swagger';
import { ColaboratorDto } from 'src/colaborators/colaboratos.dto';

export class AuthDto {
  @ApiProperty({ description: 'Email of the user' })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT token' })
  token: string;

  @ApiProperty({ description: 'Token expiration time in seconds' })
  expiresIn: number;

  @ApiProperty({ description: 'Colaborator data without password' })
  colaborator: Omit<ColaboratorDto, 'password'>;
}
