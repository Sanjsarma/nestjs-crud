import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //decorator - associate classes with metadata, helps with routing
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
