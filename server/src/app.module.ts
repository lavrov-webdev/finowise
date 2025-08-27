import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SprintsModule } from './sprints/sprints.module';
import { CategoriesModule } from './categories/categories.module';
import { EnvelopesModule } from './envelopes/envelopes.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoggerMiddleware } from './middlewares/logger';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.DEV === 'true' ? '.env.local' : '.env',
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    SprintsModule,
    EnvelopesModule,
    TransactionsModule,
    PrismaModule,
    ReportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
