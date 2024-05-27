import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class ReportParamsDto {
  @ApiProperty({ description: 'Data de início para o relatório', example: '2023-01-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'Data final para o relatório', example: '2023-12-31' })
  @IsDateString()
  endDate: string;
}
