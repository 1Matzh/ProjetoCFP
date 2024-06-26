import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAccountDto {
  @ApiProperty({ description: 'Nome da conta financeira' })
  @IsString()
  conta: string;

  @ApiProperty({ description: 'Saldo da conta financeira' })
  @IsNumber()
  saldo: number;
}

export class UpdateAccountDto extends CreateAccountDto {}
