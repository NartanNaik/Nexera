import { Controller } from '@nestjs/common';
import { ResolverService } from './resolver.service';

@Controller('resolver')
export class ResolverController {
  constructor(private readonly resolverService: ResolverService) {}
}
