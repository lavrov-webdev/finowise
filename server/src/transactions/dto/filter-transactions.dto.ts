import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  Max,
} from 'class-validator';

export class FilterTransactionsDto {
  @ApiProperty({ example: 1, required: false, description: 'Filter by sprint ID' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  sprintId?: number;

  @ApiProperty({ example: 1, required: false, description: 'Filter by category ID' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  categoryId?: number;

  @ApiProperty({ example: 1, required: false, description: 'Filter by envelope ID' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  envelopeId?: number;

  @ApiProperty({ 
    example: '2024-01-01', 
    required: false, 
    description: 'Start date for filtering (inclusive)' 
  })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value).toISOString() : undefined)
  @IsDateString()
  dateFrom?: string;

  @ApiProperty({ 
    example: '2024-01-31', 
    required: false, 
    description: 'End date for filtering (inclusive)' 
  })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value).toISOString() : undefined)
  @IsDateString()
  dateTo?: string;

  @ApiProperty({ 
    example: 100, 
    required: false, 
    minimum: 0,
    description: 'Minimum amount for filtering' 
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  amountMin?: number;

  @ApiProperty({ 
    example: 5000, 
    required: false, 
    minimum: 0,
    description: 'Maximum amount for filtering' 
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  amountMax?: number;

  @ApiProperty({ 
    example: 'продукты', 
    required: false, 
    description: 'Search in comment (partial match)' 
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ 
    example: 'date', 
    required: false, 
    enum: ['date', 'amount', 'id', 'createdAt'],
    description: 'Field to order by' 
  })
  @IsOptional()
  @IsString()
  @IsIn(['date', 'amount', 'id', 'createdAt'])
  orderBy?: string;

  @ApiProperty({ 
    example: 'desc', 
    required: false, 
    enum: ['asc', 'desc'],
    description: 'Order direction' 
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderDirection?: 'asc' | 'desc';

  @ApiProperty({ 
    example: 20, 
    required: false, 
    minimum: 1,
    maximum: 100,
    description: 'Number of records per page' 
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ 
    example: 0, 
    required: false, 
    minimum: 0,
    description: 'Number of records to skip' 
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
} 