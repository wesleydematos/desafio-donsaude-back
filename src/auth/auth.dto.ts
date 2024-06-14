export class AuthDto {
  email: string;
  password: string;
}

export class AuthResponseDto {
  token: string;
  expiresIn: number;
}
