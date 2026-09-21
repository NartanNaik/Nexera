import { Module } from '@nestjs/common';
import { ResolverService } from './resolver.service';
import { ResolverController } from './resolver.controller';

@Module({
  controllers: [ResolverController],
  providers: [ResolverService],
})
export class ResolverModule {}
