import { ApiProperty } from '@nestjs/swagger';
import { ColaboratorDto } from 'src/colaborators/colaboratos.dto';

export class AuthDto {
  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Password do usuário' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT token' })
  token: string;

  @ApiProperty({ description: 'Tempo de expiração do token em segundos' })
  expiresIn: number;

  @ApiProperty({ description: 'Dados do colaborador sem a senha.' })
  colaborator: Omit<ColaboratorDto, 'password'>;
}
