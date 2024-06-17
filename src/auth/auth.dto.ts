import { ColaboratorDto } from 'src/colaborators/colaboratos.dto';

export class AuthDto {
  email: string;
  password: string;
}

export type ColaboratorDtoWithoutPassword = Omit<ColaboratorDto, 'password'>;

export class AuthResponseDto {
  token: string;
  expiresIn: number;
  colaborator: ColaboratorDtoWithoutPassword;
}
