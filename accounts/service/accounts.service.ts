import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/service/user.service';
import { Accounts } from '../entity/accounts.entity';
import { CreateAccountDto, UpdateAccountDto } from '../dto/accounts.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountRepository: Repository<Accounts>,
    private userService: UserService
  ) {}

  async findAllByUser(userId: number): Promise<Accounts[]> {
    return this.accountRepository.find({ 
      where: { user: { id_user: userId } } 
    });
  }

  async create(userId: number, createAccountDto: CreateAccountDto): Promise<Accounts> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
    const newAccount = this.accountRepository.create({
      ...createAccountDto,
      user: user,
    });
    return await this.accountRepository.save(newAccount);
  }

  async update(userId: number, id: number, updateAccountDto: UpdateAccountDto): Promise<Accounts> {
    const account = await this.accountRepository.findOne({ 
      where: { id }, 
      relations: ['user'] 
    });

    if (!account) {
      throw new NotFoundException(`Conta não encontrada.`);
    }

    if (account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para editar esta conta.`);
    }

    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async remove(userId: number, id: number): Promise<void> {
    const account = await this.accountRepository.findOne({ 
      where: { id }, 
      relations: ['user'] });

    if (!account) {
      throw new NotFoundException(`Conta não encontrada.`);
    }

    if (account.user.id_user !== userId) {
      throw new ForbiddenException(`Você não tem permissão para deletar esta conta.`);
    }

    await this.accountRepository.delete(id);
  }
}
