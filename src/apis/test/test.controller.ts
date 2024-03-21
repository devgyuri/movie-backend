import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('/hello')
export class TestController {
  constructor(private readonly tablesService: TestService) {}

  @Get()
  getHello(): string {
    return this.tablesService.getHello();
  }
}
