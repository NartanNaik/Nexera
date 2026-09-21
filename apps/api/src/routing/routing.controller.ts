import { Controller } from '@nestjs/common';
import { RoutingService } from './routing.service';

@Controller('routing')
export class RoutingController {
  constructor(private readonly routingService: RoutingService) {}
}
