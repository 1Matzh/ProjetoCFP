import { Body, Controller, Get, Post, Query, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';
import { GenerateReportDto } from '../dto/generate-report.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.strategy';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from 'express';

@Controller('reports')
@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate-report')
  @ApiOperation({ summary: 'Gera um relatório de transações' })
  @ApiResponse({ status: 200, description: 'Relatório gerado com sucesso.' })
  async generateReport(@Body() generateReportDto: GenerateReportDto, @Req() req: Request): Promise<any> {
    const userId = req.user.userId;
    return this.reportsService.generateReport(userId, generateReportDto);
  }

  @Get('export-report')
  @ApiOperation({ summary: 'Exporta um relatório gerado' })
  @ApiResponse({ status: 200, description: 'Relatório exportado com sucesso.' })
  async exportReport(@Query() query, @Res() res: Response, @Req() req: Request) {
    const { start_date, end_date, analysis_type, format } = query;
    const userId = req.user.userId;
    const report = await this.reportsService.exportReport(userId, start_date, end_date, analysis_type, format);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=report.${format}`);
    res.send(report);
  }
}