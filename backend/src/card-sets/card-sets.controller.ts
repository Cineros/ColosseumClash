import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardSetsService } from './card-sets.service';

@Controller('card-sets')
export class CardSetsController {
  constructor(private readonly cardSetsService: CardSetsService) {}

  @Get()
  findAll() {
    return this.cardSetsService.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.cardSetsService.create(name);
  }
}
