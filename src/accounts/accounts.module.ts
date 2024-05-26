import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entity/accounts.entity';
import { Transactions } from './transactions/entity/transactions.entity';
import { AccountsController } from './controller/accounts.controller';
import { AccountsService } from './service/accounts.service';
import { TransactionsService } from './transactions/service/transactions.service';
import { TransactionsController } from './transactions/controller/transactions.controller';
import { UserModule } from 'src/user/user.module';
import { ReportsService } from '../service/reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts, Transactions]), forwardRef(() => UserModule)],
  providers: [AccountsService, TransactionsService],
  controllers: [AccountsController, TransactionsController],
  exports: [AccountsService, TransactionsService],
})
export class AccountsModule {}
