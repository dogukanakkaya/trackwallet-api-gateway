import { Controller, Get } from '@nestjs/common';
import { map } from 'rxjs';
import { AppService } from './app.service';
import { Json } from './response/json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/cryptocurrencies/listings')
  listings() {
    return this.appService.getHello().pipe(map(data => Json.success({ data })));
  }
}