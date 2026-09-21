import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
  private readonly prisma: PrismaService,
  private readonly jwtService: JwtService,
) {}

  async createFirstUser() {
    const passwordHash = await bcrypt.hash('temp-password', 10);

    return this.prisma.user.create({
      data: {
        email: 'admin@example.com',
        username: 'admin',
        passwordHash,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password.');
    }

  const payload = {
  sub: user.id,
  username: user.username,
  role: user.role,
};

const accessToken = await this.jwtService.signAsync(payload);

const { passwordHash, ...safeUser } = user;

return {
  message: 'Login successful.',
  accessToken,
  user: safeUser,
};
  }
}