import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );
    if (isPasswordValid) {
      const { password, ...res } = user
      return res
    }

    return null
  }

  async signIn(user: UserResponseDto) {
    return this.getAccessToken(user.id, user.email);
  }

  async signUp(signUpDto: CreateUserDto) {
    const user = await this.userService.findByEmail(signUpDto.email);
    if (user) throw new ConflictException('User with that email already exist');
    const createdUser = await this.userService.create({
      ...signUpDto,
    });
    return this.getAccessToken(
      createdUser.id,
      createdUser.email,
    );
  }

  private getAccessToken(id: number, email: string) {
    const payload = {
      sub: id,
      email: email,
    };
    return this.jwtService.signAsync(payload);
  }
}
