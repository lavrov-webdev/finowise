import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  TransactionDetailedResponseDto,
  TransactionResponseDto
} from './dto/transaction.response.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('transactions')
@UsePipes(new ValidationPipe({ transform: true }))
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiCreatedResponse({ type: TransactionResponseDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req: RequestWithUser,
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({ type: [TransactionDetailedResponseDto] })
  findAll(
    @Request() req: RequestWithUser,
  ): Promise<TransactionDetailedResponseDto[]> {
    return this.transactionsService.findAll(req.user.id);
  }

  @Get('by_sprint/:sprintId')
  @ApiOkResponse({ type: [TransactionDetailedResponseDto] })
  findBySprint(
    @Param('sprintId') sprintId: string,
    @Request() req: RequestWithUser,
  ): Promise<TransactionDetailedResponseDto[]> {
    return this.transactionsService.findBySprint(req.user.id, +sprintId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TransactionResponseDto })
  @ApiNotFoundResponse({ description: 'Transactions not found' })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req: RequestWithUser,
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.update(
      +id,
      updateTransactionDto,
      req.user.id,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: TransactionResponseDto })
  @ApiNotFoundResponse({ description: 'Transactions not found' })
  remove(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<TransactionResponseDto> {
    return this.transactionsService.remove(+id, req.user.id);
  }
}
