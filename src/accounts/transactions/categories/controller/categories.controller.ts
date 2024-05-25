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
  import { CategoriesService } from '../service/categories.service';
  import { CreateCategoryDto, UpdateCategoryDto } from '../dto/categories.dto';
  import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard.strategy';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
  import { Request } from 'express';
  import { Transactions } from 'src/accounts/transactions/entity/transactions.entity';
  
  @Controller('categories')
  @ApiTags('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }
  
    @Get()
    @ApiOperation({ summary: 'Get all Categories' })
    async findAllByUser(@Req() req: Request) {
      const userId = req.user.userId;
      return this.categoriesService.findAllByUser(userId);
    }

    @Get(':id/transactions')
@ApiOperation({ summary: 'Get transactions by category' })
@ApiParam({ name: 'id', description: 'Category ID' })
async findTransactionsByCategory(@Param('id') categoryId: number, @Req() req: Request) {
  const userId = req.user.userId;
  return this.categoriesService.findByCategory(categoryId, userId);
}

  
    @Post(':id')
    @ApiOperation({ summary: 'Create a new Category' })
    @ApiParam({ name: 'id', description: 'account ID' })
    async create(@Param('id') accountId: number, @Body() createCategoryDto: CreateCategoryDto, @Req() req: Request) {
      const userId = req.user.userId;
      return await this.categoriesService.create(accountId, createCategoryDto, userId);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get all Categories for a specific account' })
    @ApiParam({ name: 'id', description: 'account ID' })
    async findAllByaccount(@Param('id') accountId: number, @Req() req: Request) {
      const userId = req.user.userId;
      return this.categoriesService.findAllByAccount(accountId, userId);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update an existing category' })
    @ApiParam({ name: 'id', description: 'Category ID' })
    async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req: Request): Promise<any> {
      const userId = req.user.userId;
      return this.categoriesService.update(id, updateCategoryDto, userId);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiParam({ name: 'id', description: 'category ID' })
    async remove(@Param('id') id: number, @Req() req: Request): Promise<void> {
      const userId = req.user.userId;
      return this.categoriesService.remove(id, userId);
    }
  
  }