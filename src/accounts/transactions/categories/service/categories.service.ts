import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from '../entity/categories.entity';
import { Accounts } from '../../entity/accounts.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
import { Transactions } from 'src/accounts/transactions/entity/transactions.entity';
import { TransactionsService } from 'src/accounts/transactions/service/transactions.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
  ) { }

  async findAllByUser(userId: number): Promise<Categories[]> {
    return this.categoriesRepository.find({
      where: { accounts: { user: { id_user: userId } } }
    });
  }

  async findAllByAccount(accountId: number, userId: number): Promise<Categories[]> {
    const account = await this.accountsRepository.findOne({
      where: { id: accountId },
      relations: ['user']
    });

    if (!account) {
      throw new NotFoundException(`Conta não encontrada.`);
    }

    if (account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para visualizar as categorias desta conta.`);
    }

    return this.categoriesRepository.find({
      where: { accounts: { id: accountId } }
    });
  }

  async findByCategory(categoryId: number, userId: number): Promise<Transactions[]> {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
      relations: ['accounts', 'accounts.user']
    });
  
    if (!category) {
      throw new NotFoundException(`Categoria não encontrada.`);
    }
  
    if (category.accounts.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para acessar esta categoria.`);
    }
  
    return this.transactionsRepository.find({
      where: { category }
    });
  }
  

  async create(accountId, createCategoryDto: CreateCategoryDto, userId: number): Promise<Categories> {
    const account = await this.accountsRepository.findOne({
      where: { id: accountId },
      relations: ['user']
    });

    if (!account) {
      throw new NotFoundException(`Conta não encontrada.`);
    }

    if (account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para adicionar categoria a esta conta.`);
    }

    const category = this.categoriesRepository.create({
      ...createCategoryDto,
      account,
    });

    return await this.categoriesRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, userId: number): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['account', 'account.user']
    });

    if (!category) {
      throw new NotFoundException(`Categoria não encontrada.`);
    }

    if (category.accounts.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para editar esta categoria.`);
    }

    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async remove(id: number, userId: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['account', 'account.user']
    });

    if (!category) {
      throw new NotFoundException(`Categoria não encontrada.`);
    }

    if (category.accounts.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para deletar esta categoria.`);
    }

    await this.categoriesRepository.delete(id);
  }
}