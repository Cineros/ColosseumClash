import type { CardData, CardColor, CardCost } from '../types/CardData';

interface DatabaseCard {
    id: string;
    cardNumber: number;
    title: string;
    description?: string | null;
    creator: string;
    artist: string;
    colors: string[];
    costs: {
        color: string;
        amount: number;
    }[];
    primaryType: string;
    tribe?: string | null;
    rarity?: string | null;
    speed?: string | null;
    damage?: number | null;
    armor?: number | null;
    health?: number | null;
    artwork?: string | null;
    set: {
        id: string;
        name: string;
    };
}

export function mapDatabaseCardToCardData(card: DatabaseCard): CardData {
    return {
        type: card.primaryType,

        title: card.title,

        artist: card.artist,

        colors: card.colors as CardColor[],

        costs: card.costs as CardCost[],

        typeInfo: {
            primary: card.primaryType,
            set: card.set.name,
            tribe: card.tribe ?? undefined,
            rarity: card.rarity ?? undefined,
            speed: card.speed ?? undefined,
        },

        description: card.description ?? undefined,

        artwork: card.artwork ?? undefined,

        metadata: {
            cardNumber: card.cardNumber,
            creator: card.creator,
        },

        damage: card.damage ?? undefined,
        armor: card.armor ?? undefined,
        health: card.health ?? undefined,
    };
}
