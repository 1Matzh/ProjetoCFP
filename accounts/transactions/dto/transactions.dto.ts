import { IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Tipo da transação' })
  @IsString()
  tipo: string;

  @ApiProperty({ description: 'Valor da transação' })
  @IsNumber()
  valor: number;

  @ApiProperty({ description: 'Descrição da transação' })
  @IsString()
  descricao: string;

  @ApiProperty({ description: 'Categoria da transação' })
  @IsString()
  categoria: string;
}

export class UpdateTransactionDto extends CreateTransactionDto {}
