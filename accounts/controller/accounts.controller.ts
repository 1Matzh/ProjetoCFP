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
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAllByUser(@Req() req: Request): Promise<any[]> {
    const userId = req.user.userId;
    return this.accountsService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto, @Req() req: Request): Promise<any> {
    const userId = req.user.userId;
    return this.accountsService.create(userId, createAccountDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto, @Req() req: Request): Promise<any> {
    const userId = req.user.userId;
    return this.accountsService.update(userId, id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: Request): Promise<void> {
    const userId = req.user.userId;
    return this.accountsService.remove(userId, id);
  }
}

