import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { ReportFilterDto, ReportResponseDto } from './dto/report.response.dto';
import { ReportService } from './report.service';

@ApiTags('report')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }


  @Get()
  @ApiOkResponse({ type: ReportResponseDto })
  find(
    @Request() req: RequestWithUser,
    @Query() filterDto: ReportFilterDto,
  ) {
    return this.reportService.find(req.user.id, filterDto.sprintId, filterDto.categoryId);
  }
}
