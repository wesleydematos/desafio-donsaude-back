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
  @ApiPropertyOptional({ description: 'UUID of the colaborator' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Name of the colaborator' })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({ description: 'Document number of the colaborator' })
  @IsString()
  @MinLength(11)
  @MaxLength(14)
  documentNumber: string;

  @ApiProperty({ description: 'Phone number of the colaborator' })
  @IsString()
  @MinLength(11)
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Email of the colaborator' })
  @IsEmail()
  @MinLength(7)
  @MaxLength(100)
  email: string;

  @ApiProperty({ description: 'Password of the colaborator' })
  @IsString()
  @MinLength(5)
  password: string;

  @ApiPropertyOptional({ description: 'Photo URL of the colaborator' })
  @IsOptional()
  photo?: string;
}

export class UpdateColaboratorDto extends PartialType(ColaboratorDto) {}
