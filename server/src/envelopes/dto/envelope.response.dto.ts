import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from 'src/categories/dto/category.response.dto';
import { TransactionResponseDto } from 'src/transactions/dto/transaction.response.dto';

export class EnvelopeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-08-07T08:10:58.772Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-08-07T08:10:58.772Z' })
  updatedAt: Date;

  @ApiProperty({ example: 1500 })
  amount: number;

  @ApiProperty({ example: 1 })
  categoryId: number | null;

  @ApiProperty({ example: 1 })
  sprintId: number;

  @ApiProperty({ example: 1 })
  userId: number;
}

export class EnvelopeDetailedResponseDto extends EnvelopeResponseDto {
  @ApiProperty({ type: [TransactionResponseDto] })
  transactions: TransactionResponseDto[];

  @ApiProperty({ type: CategoryResponseDto })
  category: CategoryResponseDto;
}

