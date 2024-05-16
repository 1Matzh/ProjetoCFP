import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAccountDto {
  @ApiProperty({ description: 'Nome da conta financeira' })
  @IsString()
  conta: string;

  @ApiProperty({ description: 'Id do usuário' })
  @IsInt()
  userId: number;
}

export class UpdateAccountDto extends CreateAccountDto {}
