import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './identity/identity.module';
import { ResolverModule } from './resolver/resolver.module';
import { RoutingModule } from './routing/routing.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, IdentityModule, ResolverModule, RoutingModule, UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
