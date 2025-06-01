import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { TransactionDetailedResponseDto } from './dto/transaction.response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvelopesService } from 'src/envelopes/envelopes.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private envelopesService: EnvelopesService,
  ) { }

  async findTransactions(
    filterDto: FilterTransactionsDto,
    userId: number,
  ): Promise<TransactionDetailedResponseDto[]> {
    // Build dynamic where clause
    const where: Prisma.TransactionWhereInput = { userId };

    // Add filters if provided
    if (filterDto.sprintId !== undefined) {
      where.sprintId = filterDto.sprintId;
    }

    if (filterDto.categoryId !== undefined) {
      where.categoryId = filterDto.categoryId;
    }

    if (filterDto.envelopeId !== undefined) {
      where.envelopeId = filterDto.envelopeId;
    }

    // Date range filtering - allow partial ranges
    if (filterDto.dateFrom || filterDto.dateTo) {
      where.date = {};
      if (filterDto.dateFrom) {
        where.date.gte = new Date(filterDto.dateFrom);
      }
      if (filterDto.dateTo) {
        // If only dateTo is provided, date can still be used
        if (!filterDto.dateFrom) {
          where.date = { lte: new Date(filterDto.dateTo) };
        } else {
          where.date.lte = new Date(filterDto.dateTo);
        }
      }
    }

    // Amount range filtering - allow partial ranges
    if (filterDto.amountMin !== undefined || filterDto.amountMax !== undefined) {
      where.amount = {};
      if (filterDto.amountMin !== undefined) {
        where.amount.gte = filterDto.amountMin;
      }
      if (filterDto.amountMax !== undefined) {
        // If only amountMax is provided, amount can still be used
        if (filterDto.amountMin === undefined) {
          where.amount = { lte: filterDto.amountMax };
        } else {
          where.amount.lte = filterDto.amountMax;
        }
      }
    }

    // Comment search (partial match)
    if (filterDto.comment) {
      where.comment = {
        contains: filterDto.comment,
        mode: 'insensitive',
      };
    }

    // Build dynamic orderBy
    const orderBy: Prisma.TransactionOrderByWithRelationInput[] = [];
    if (filterDto.orderBy && filterDto.orderDirection) {
      orderBy.push({
        [filterDto.orderBy]: filterDto.orderDirection,
      });
    } else {
      // Default sorting
      orderBy.push(
        { date: 'desc' },
        { id: 'desc' }
      );
    }

    // Build query options
    const queryOptions: Prisma.TransactionFindManyArgs = {
      where,
      orderBy,
      include: {
        category: true,
      },
    };

    // Add pagination if provided
    if (filterDto.limit !== undefined) {
      queryOptions.take = filterDto.limit;
    }

    if (filterDto.offset !== undefined) {
      queryOptions.skip = filterDto.offset;
    }

    const result = await this.prisma.transaction.findMany(queryOptions);
    return result as unknown as TransactionDetailedResponseDto[];
  }

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const foundedEnvelope = await this.envelopesService.getOne(
      createTransactionDto.envelopeId,
      userId,
    );
    return await this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        userId,
        categoryId: foundedEnvelope.categoryId,
        sprintId: foundedEnvelope.sprintId,
      },
    });
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
    userId: number,
  ) {
    await this.checkIsUsersTransactionOrThrow(id, userId);
    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.checkIsUsersTransactionOrThrow(id, userId);
    return this.prisma.transaction.delete({ where: { id } });
  }

  private async checkIsUsersTransactionOrThrow(
    transactionId: number,
    userId: number,
  ) {
    const findedTransaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    if (!findedTransaction || findedTransaction.userId !== userId)
      throw new NotFoundException('Transaction not found');
    return findedTransaction;
  }
}
