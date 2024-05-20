import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from '../entity/transactions.entity';
import { Accounts } from '../../entity/accounts.entity';
import { CreateTransactionDto, UpdateTransactionDto } from '../dto/transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) { }

  async findAllByUser(userId: number): Promise<Transactions[]> {
    return this.transactionsRepository.find({
      where: { account: { user: { id_user: userId } } }
    });
  }

  async findAllByAccount(accountId: number, userId: number): Promise<Transactions[]> {
    const account = await this.accountsRepository.findOne({
      where: { id: accountId },
      relations: ['user']
    });

    if (!account) {
      throw new NotFoundException(`Conta não encontrada.`);
    }

    if (account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para visualizar transações desta conta.`);
    }

    return this.transactionsRepository.find({
      where: { account: { id: accountId } }
    });
  }

  async create(accountId, createTransactionDto: CreateTransactionDto, userId: number): Promise<Transactions> {
    const account = await this.accountsRepository.findOne({
      where: { id: accountId },
      relations: ['user']
    });

    if (!account) {
      throw new NotFoundException(`Conta não encontrada.`);
    }

    if (account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para adicionar transações a esta conta.`);
    }

    const transaction = this.transactionsRepository.create({
      ...createTransactionDto,
      account,
    });

    return await this.transactionsRepository.save(transaction);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto, userId: number): Promise<Transactions> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['account', 'account.user']
    });

    if (!transaction) {
      throw new NotFoundException(`Transação não encontrada.`);
    }

    if (transaction.account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para editar esta transação.`);
    }

    Object.assign(transaction, updateTransactionDto);
    return this.transactionsRepository.save(transaction);
  }

  async remove(id: number, userId: number): Promise<void> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['account', 'account.user']
    });

    if (!transaction) {
      throw new NotFoundException(`Transação não encontrada.`);
    }

    if (transaction.account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para deletar esta transação.`);
    }

    await this.transactionsRepository.delete(id);
  }
}

