import { Controller, Post, Body, Get, Param, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags,  ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ schema: {
    properties: {
      email: { type: 'string' },
      senha: { type: 'string' }
    }
  }})
  async login(@Body() loginDto: { email: string; senha: string} ) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new NotFoundException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }
}