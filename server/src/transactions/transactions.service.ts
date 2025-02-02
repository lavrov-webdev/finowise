import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvelopesService } from 'src/envelopes/envelopes.service';

@Injectable()
export class TransactionsService {
  findBySprint(userId: number, sprintId: number): Promise<import("./dto/transaction.response.dto").TransactionDetailedResponseDto[]> {
    return this.prisma.transaction.findMany({
      where: { userId, sprintId },
      orderBy: [
        {
          date: "desc"
        },
        {
          id: "desc"
        }
      ],
      include: {
        category: true,
      },
    })
  }
  constructor(
    private prisma: PrismaService,
    private envelopesService: EnvelopesService,
  ) { }
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

  findAll(userId: number) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: [
        {
          date: "desc"
        },
        {
          id: "desc"
        }
      ],
      include: {
        category: true,
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
