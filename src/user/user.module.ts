import { Module } from '@nestjs/common';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { Accounts } from 'src/accounts/entity/accounts.entity';
import { AccountsService } from 'src/accounts/service/accounts.service';
import { AccountsController } from 'src/accounts/controller/accounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Accounts])],
  providers: [UserService, AccountsService],
  controllers: [UserController, AccountsController],
})
export class UserModule {}
