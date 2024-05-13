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
  import { FiliacaoService } from "../service/filiacao.service";
  import { CreateFiliacaoDto, UpdateFiliacaoDto } from "../dto/filicacao.dto";
  import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard.strategy";
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
    
  @Controller("filiacao")
  @ApiTags('filiacao')
  export class FiliacaoController {
    constructor(private readonly filiacaoService: FiliacaoService) {}
  
    @Post()
    async create(@Body() createFiliacaoDto: CreateFiliacaoDto) {
      return await this.filiacaoService.create(createFiliacaoDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req) {
      return await this.filiacaoService.findAll();
    }
  
    @Get(":id")
    async findOne(@Param("id") id: number) {
      return await this.filiacaoService.findOne(id);
    }
  
    @Put(":id")
    async update(
      @Param("id") id: number,
      @Body() updateFiliacaoDto: UpdateFiliacaoDto
    ) {
      return await this.filiacaoService.update(id, updateFiliacaoDto);
    }
  
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param("id") id: number) {
      return await this.filiacaoService.remove(id);
    }
  }