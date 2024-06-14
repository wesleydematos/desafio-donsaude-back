import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ColaboratorDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @IsString()
  @MinLength(11)
  @MaxLength(14)
  documentNumber: string;

  @IsString()
  @MinLength(11)
  @MaxLength(20)
  phone: string;

  @IsEmail()
  @MinLength(7)
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsOptional()
  photo?: string;
}
