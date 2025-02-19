import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('frontend/index')  // Ensure this matches the template path
  getHello() {
    return this.appService.getHello();
  }
}
