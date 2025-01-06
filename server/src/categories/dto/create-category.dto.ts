import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MaxLength, ValidateNested } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Category name' })
  @IsString()
  @MaxLength(100)
  name: string;
}

export class CreateCategoriesArrayDto {
  @ApiProperty({ type: [CreateCategoryDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  categories: CreateCategoryDto[];
}