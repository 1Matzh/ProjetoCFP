import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from '../../entity/transactions.entity';
import { ReportParamsDto } from '../dto/report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) {}

  async getReport(userId: number, reportParams: ReportParamsDto) {
    const { startDate, endDate } = reportParams;

    const transactions = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .innerJoin('transaction.account', 'account')
      .innerJoin('account.user', 'user')
      .where('id_user = :userId', { userId })
      .andWhere('transaction.data BETWEEN :startDate AND :endDate', { startDate, endDate })
      .select([
        'transaction.id',
        'transaction.tipo',
        'transaction.valor',
        'transaction.descricao',
        'transaction.categoria',
        'transaction.data',
        'account.id',
        'account.conta',
      ])
      .getMany();

    return {
      transactions,
    };
  }
}
