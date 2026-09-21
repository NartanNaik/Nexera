import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIdentityDto } from './create-identity.dto';
import {
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class IdentityService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll() {
    return this.prisma.identity.findMany();
  }
  async create(
    userId: string,
    createIdentityDto: CreateIdentityDto,
  ) {
    const existing = await this.prisma.identity.findUnique({
      where: {
        handle: createIdentityDto.handle,
      },
    });

    if (existing) {
      throw new ConflictException(
        `The handle "${createIdentityDto.handle}" is already taken.`,
      );
    }

    try {
      return await this.prisma.identity.create({
        data: {
          ...createIdentityDto,
          userId,
        },
      });
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw error;
    }
  }
}