import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CardSetsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cardSet.findMany();
  }

  async create(name: string) {
    return this.prisma.cardSet.create({
      data: {
        name,
      },
    });
  }
}
