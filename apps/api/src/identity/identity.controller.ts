import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { IdentityService } from './identity.service';
import { CreateIdentityDto } from './create-identity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req: Request) {
    console.log(req.user);

    return this.identityService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body() dto: CreateIdentityDto,
  ) {
    const user = req.user;

    if (!user) {
      throw new Error('Authenticated user not found.');
    }

    return this.identityService.create(
      user.sub,
      dto,
    );
  }
}