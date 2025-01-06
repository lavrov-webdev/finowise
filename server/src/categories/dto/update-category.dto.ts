import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, MaxLength, Min, ValidateNested } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ example: 'Category name' })
  @IsString()
  @MaxLength(100)
  name: string;
}

export class UpdateCategoriesArrayDto {
  @ApiProperty({ type: [UpdateCategoryDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateCategoryDto)
  categories: UpdateCategoryDto[];
}