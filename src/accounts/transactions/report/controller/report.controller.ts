import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.strategy';
import { ReportParamsDto } from '../dto/report.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('reports')
@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly ReportsService: ReportsService) {}

  @Get(':date')
  @ApiOperation({ summary: 'Generate transaction report' })
  async getReport(@Query() reportParams: ReportParamsDto, @Req() req: Request) {
    const userId = req.user.userId;
    return await this.ReportsService.getReport(userId, reportParams);
  }
}