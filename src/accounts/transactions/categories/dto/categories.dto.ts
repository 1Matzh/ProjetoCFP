import { IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Tipo da categoria' })
  @IsString()
  nome: string;

}

export class UpdateCategoryDto extends CreateCategoryDto {}