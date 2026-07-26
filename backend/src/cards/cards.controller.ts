import { Controller, Get } from '@nestjs/common';

@Controller('cards')
export class CardsController {
    @Get()
    getCards() {
        return [
            {
                id: 1,
                title: "Temp"
            },
            {
                id: 2,
                title: "Temp2"
            }
        ]
    }
}
