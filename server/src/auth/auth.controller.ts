import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/decorators';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiNoContentResponse({ description: 'Success login' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async signIn(
    @Request() req,
    @Res({ passthrough: true }) response: Response
  ) {
    const token = await this.authService.signIn(req.user);
    response.cookie("jwt", token)
  }

  @ApiCreatedResponse({ description: 'User was successfully created' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @Public()
  @Post('create')
  async signUp(
    @Body() signUpDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const token = await this.authService.signUp(signUpDto);
    response.cookie("jwt", token)
  }

  @ApiNoContentResponse({ description: 'User was successfully logout' })
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie("jwt")
    res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
