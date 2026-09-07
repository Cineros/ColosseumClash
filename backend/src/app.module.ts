import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CardSetsModule } from './card-sets/card-sets.module';
import { UploadsModule } from './uploads/uploads.module';
import { CardsModule } from './cards/cards.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    CardSetsModule,
    UploadsModule,
    CardsModule,
  ],
})
export class AppModule {}
