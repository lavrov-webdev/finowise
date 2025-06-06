import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  EnvelopeDetailedResponseDto
} from 'src/envelopes/dto/envelope.response.dto';
import { envelopeExample, trancationExample } from './examples';

export class SprintResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-08-07T09:05:51.393Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-08-07T09:05:51.393Z' })
  updatedAt: Date;

  @ApiProperty({ example: '2023-06-23T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2023-07-10T00:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ example: 20000 })
  startSum: number;

  @ApiProperty({ example: 1 })
  userId: number;
}

export class SprintDetailedResponseDto extends SprintResponseDto {
  @ApiProperty({
    example: [
      {
        ...envelopeExample,
        transactions: [trancationExample],
      },
    ],
    type: [EnvelopeDetailedResponseDto],
  })
  envelopes: EnvelopeDetailedResponseDto[];

  @ApiProperty({ example: 2000 })
  currentBalance: number;

  @ApiProperty({ example: 2000 })
  totalSpendings: number;

  @ApiProperty({ example: 5000 })
  totalPlain: number;
}

export class SprintIdDto extends PickType(SprintResponseDto, ['id']) { }