import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { SprintsModule } from 'src/sprints/sprints.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [
    SprintsModule,
    CategoriesModule
  ]
})
export class ReportModule { }
