import { Test, TestingModule } from '@nestjs/testing';
import { ResolverController } from './resolver.controller';
import { ResolverService } from './resolver.service';

describe('ResolverController', () => {
  let controller: ResolverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResolverController],
      providers: [ResolverService],
    }).compile();

    controller = module.get<ResolverController>(ResolverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
