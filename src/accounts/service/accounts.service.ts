import { Injectable, NotFoundException } from "@nestjs/common";
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

  async create(createAccountDto: CreateAccountDto): Promise<Accounts> {
    const user = await this.userService.findOne(createAccountDto.userId);
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
    const newAccount = this.accountRepository.create({
      ...createAccountDto,
      user: user,
    });
    return await this.accountRepository.save(newAccount);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Accounts> {
    const account = await this.accountRepository.preload({
      id: id,
      ...updateAccountDto,
    });
    return this.accountRepository.save(account);
  }

  async remove(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }
}
