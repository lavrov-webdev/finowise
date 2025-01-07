import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Request
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  getMe(@Request() req: RequestWithUser): Promise<UserResponseDto> {
    return this.usersService.find(req.user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('password')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'Validation error' })
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Request() req: RequestWithUser,
  ) {
    return this.usersService.updatePassword(updatePasswordDto, req.user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('email')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'Validation error' })
  updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Request() req: RequestWithUser,
  ) {
    return this.usersService.updateEmail(updateEmailDto, req.user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  @ApiNoContentResponse()
  remove(@Request() req: RequestWithUser) {
    return this.usersService.remove(req.user.id);
  }
}
