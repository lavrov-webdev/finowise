import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportResponseDto } from './dto/report.response.dto';

@Injectable()
export class ReportService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async find(userId: number): Promise<ReportResponseDto> {
        const [sprintsWithTransactions, categoriesWithTransactions, totalSpend] = await Promise.all([
            this.prisma.sprint.findMany({
                where: {
                    userId
                },
                include: {
                    transactions: {
                        select: {
                            amount: true
                        }
                    }
                }
            }),
            this.prisma.category.findMany({
                where: {
                    userId
                },
                include: {
                    transactions: {
                        select: {
                            amount: true
                        }
                    }
                }
            }),
            this.prisma.transaction.aggregate({
                where: {
                    userId
                },
                _sum: {
                    amount: true
                }
            })
        ]);
        const report: ReportResponseDto = {
            sprints: {
                items: sprintsWithTransactions.map(sprint => {
                    const { transactions, ...sprintData } = sprint;
                    return {
                        ...sprintData,
                        totalSpend: transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
                    }
                })
            },
            categories: {
                items: categoriesWithTransactions.map(category => {
                    const { transactions, ...categoryData } = category;
                    return {
                        ...categoryData,
                        totalSpend: transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
                    }
                })
            },
            totalSpend: totalSpend._sum.amount || 0
        }
        return report;
    }
}
