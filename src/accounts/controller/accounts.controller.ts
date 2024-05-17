import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AccountsService } from "../service/accounts.service";
import { CreateAccountDto, UpdateAccountDto } from "../dto/accounts.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard.strategy";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@Controller("accounts")
@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto, @Req() req: Request) {
    const userId = req.user.userId;
    return this.accountsService.create(userId, createAccountDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.accountsService.remove(id);
  }
}

