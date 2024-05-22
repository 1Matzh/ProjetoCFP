import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateReportDto {
  @ApiProperty({ description: 'Data de início do intervalo de tempo' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ description: 'Data de término do intervalo de tempo' })
  @IsDateString()
  end_date: string;

  @ApiProperty({ description: 'Tipo de análise (por exemplo, por categoria, por mês)' })
  @IsString()
  analysis_type: string;
}