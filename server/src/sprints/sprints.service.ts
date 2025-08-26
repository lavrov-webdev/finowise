import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EnvelopesService } from 'src/envelopes/envelopes.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SprintsService {
  constructor(
    private prisma: PrismaService,
    private envelopesService: EnvelopesService,
  ) { }
  async create(createSprintDto: CreateSprintDto, userId: number) {
    const { envelopes, ...createSprintData } = createSprintDto;
    const { id } = await this.prisma.sprint.create({
      data: { ...createSprintData, userId },
    });
    const createEnvelopesPromises = envelopes.map((e) => {
      return this.envelopesService.create(
        {
          ...e,
          sprintId: id,
        },
        userId,
      );
    });
    return Promise.all(createEnvelopesPromises).then(() =>
      this.prisma.sprint.findUnique({
        where: { id },
      }),
    );

  }

  async findAll(userId: number) {
    return this.prisma.sprint.findMany({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number) {
    const foundedSprint = await this.prisma.sprint.findUnique({
      where: { id, userId },
      include: {
        envelopes: {
          include: {
            transactions: true,
            category: true
          },
          orderBy: {
            category: {
              name: 'asc',
            },
          },
        },
        transactions: true,
      },
    });
    const { transactions: _, ...result } = foundedSprint;
    const totalSpendings = foundedSprint.transactions.reduce(
      (prev, curr) => curr.amount + prev,
      0,
    );
    return {
      ...result,
      totalSpendings,
      totalPlain: foundedSprint.startSum,
      currentBalance: foundedSprint.startSum - totalSpendings,
    };
  }

  async findCurrent(userId: number) {
    const now = new Date(Date.now());
    return this.prisma.sprint.findFirst({
      where: {
        AND: {
          userId,
          startDate: {
            lte: now,
          },
          endDate: {
            gte: now,
          },
        },
      },
      select: { id: true },
    });
  }

  async update(id: number, updateSprintDto: UpdateSprintDto, userId: number) {
    try {
      return this.prisma.sprint.update({ where: { id, userId }, data: updateSprintDto })
    } catch (err) {
      throw new NotFoundException('Sprint not found');
    };
  }

  async remove(id: number, userId: number) {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id, userId },
      include: {
        envelopes: {
          include: {
            transactions: true
          }
        }
      }
    });

    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }

    try {
      return await this.prisma.sprint.delete({
        where: { id, userId }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Sprint not found');
        }
      }
      throw error;
    }
  }
}
