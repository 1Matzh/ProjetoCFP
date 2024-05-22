import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionsService } from '../service/transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from '../dto/transactions.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.strategy';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('transactions')
@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  async findAllByUser(@Req() req: Request) {
    const userId = req.user.userId;
    return this.transactionsService.findAllByUser(userId);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  async create(@Param('id') accountId: number, @Body() createTransactionDto: CreateTransactionDto, @Req() req: Request) {
    const userId = req.user.userId;
    return await this.transactionsService.create(accountId, createTransactionDto, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get all transactions for a specific account' })
  @ApiParam({ name: 'id', description: 'Account ID' })
  async findAllByAccount(@Param('id') accountId: number, @Req() req: Request) {
    const userId = req.user.userId;
    return this.transactionsService.findAllByAccount(accountId, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  async update(@Param('id') id: number, @Body() updateTransactionDto: UpdateTransactionDto, @Req() req: Request): Promise<any> {
    const userId = req.user.userId;
    return this.transactionsService.update(id, updateTransactionDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  async remove(@Param('id') id: number, @Req() req: Request): Promise<void> {
    const userId = req.user.userId;
    return this.transactionsService.remove(id, userId);
  }

}
