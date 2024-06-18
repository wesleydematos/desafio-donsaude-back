import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ColaboratorDto {
  @ApiPropertyOptional({ description: 'UUID do colaborator' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Nome do colaborador' })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({ description: 'CPF do colaborador' })
  @IsString()
  @MinLength(11)
  @MaxLength(14)
  documentNumber: string;

  @ApiProperty({ description: 'Número do telefone do colaborador' })
  @IsString()
  @MinLength(11)
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Email do colaborador' })
  @IsEmail()
  @MinLength(7)
  @MaxLength(100)
  email: string;

  @ApiProperty({ description: 'Senha do colaborador' })
  @IsString()
  @MinLength(5)
  password: string;

  @ApiPropertyOptional({ description: 'Foto do colaborador' })
  @IsOptional()
  photo?: string;
}

export class UpdateColaboratorDto extends PartialType(ColaboratorDto) {}
