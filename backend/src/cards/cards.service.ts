import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.card.findMany({
      include: {
        set: true,
      },
      orderBy: [
        {
          setId: 'asc',
        },
        {
          cardNumber: 'asc',
        },
      ],
    });
  }

  async create(createCardDto: CreateCardDto) {
    const set = await this.prisma.cardSet.findUnique({
      where: {
        id: createCardDto.setId,
      },
      include: {
        cards: {
          orderBy: {
            cardNumber: 'desc',
          },
          take: 1,
        },
      },
    });

    if (!set) {
      throw new Error('Card set not found');
    }

    if (!set.cardsEditable) {
      throw new Error('Cards in this set are no longer editable');
    }

    const nextCardNumber =
      set.cards.length > 0 ? set.cards[0].cardNumber + 1 : 1;

    if (nextCardNumber > set.cardCount) {
      throw new Error('This card set is full');
    }

    return this.prisma.card.create({
      data: {
        title: createCardDto.title,
        description: createCardDto.description,

        creator: createCardDto.creator,
        artist: createCardDto.artist,

        colors: createCardDto.colors,
        costs: createCardDto.costs,

        primaryType: createCardDto.primaryType,
        tribe: createCardDto.tribe,
        rarity: createCardDto.rarity,
        speed: createCardDto.speed,

        damage: createCardDto.damage,
        armor: createCardDto.armor,
        health: createCardDto.health,

        artwork: createCardDto.artwork,

        setId: createCardDto.setId,

        cardNumber: nextCardNumber,
      },
    });
  }

  async remove(id: string) {
    const card = await this.prisma.card.findUnique({
      where: {
        id,
      },
      include: {
        set: true,
      },
    });

    if (!card) {
      throw new Error('Card not found');
    }

    if (!card.set.cardsEditable) {
      throw new Error('Cards in this set are no longer editable');
    }

    await this.prisma.card.delete({
      where: {
        id,
      },
    });

    await this.prisma.card.updateMany({
      where: {
        setId: card.setId,
        cardNumber: {
          gt: card.cardNumber,
        },
      },
      data: {
        cardNumber: {
          decrement: 1,
        },
      },
    });

    return {
      message: 'Card deleted successfully',
    };
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.prisma.card.findUnique({
      where: {
        id,
      },
      include: {
        set: true,
      },
    });

    if (!card) {
      throw new Error('Card not found');
    }

    if (!card.set.cardsEditable) {
      throw new Error('Cards in this set are no longer editable');
    }

    return this.prisma.card.update({
      where: {
        id,
      },
      data: updateCardDto,
    });
  }

  async findOne(id: string) {
    const card = await this.prisma.card.findUnique({
      where: {
        id,
      },
      include: {
        set: true,
      },
    });

    if (!card) {
      throw new Error('Card not found');
    }

    return card;
  }
}
