import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Equal } from 'typeorm';
import { Transactions } from 'src/accounts/transactions/entity/transactions.entity';
import { GenerateReportDto } from '../dto/generate-report.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) {}

  async generateReport(userId: number, generateReportDto: GenerateReportDto): Promise<any> {
    const { start_date, end_date, analysis_type } = generateReportDto;
    const startDateObject = new Date(start_date);
    const endDateObject = new Date(end_date);

    const transactions = await this.transactionsRepository.find({
      where: {
        account: {
          user: Equal(userId)
        },
        data: Between(startDateObject, endDateObject),
      },
      relations: ['category'],
    });

    const reportData = this.analyzeTransactions(transactions, analysis_type);
    return reportData;
  }

  private analyzeTransactions(transactions: Transactions[], analysis_type: string): any {
    const analysisResult = {};
    // Implemente a lógica de análise
    return analysisResult;
  }

  async exportReport(userId: number, start_date: string, end_date: string, analysis_type: string, format: string): Promise<Buffer> {
    const reportData = await this.generateReport(userId, { start_date, end_date, analysis_type });

    if (format === 'pdf') {
      return this.generatePdfReport(reportData);
    } else if (format === 'csv') {
      return this.generateCsvReport(reportData);
    } else {
      throw new NotFoundException('Formato de relatório não suportado.');
    }
  }

  private generatePdfReport(reportData: any): Buffer {
    // Implemente a lógica para gerar um relatório PDF
    return Buffer.alloc(0); // Se não houver lógica de geração de relatório, retorne um Buffer vazio
  }

  private generateCsvReport(reportData: any): Buffer {
    // Implemente a lógica para gerar um relatório CSV
    return Buffer.alloc(0); // Se não houver lógica de geração de relatório, retorne um Buffer vazio
 


  }
  
}