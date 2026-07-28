export type CardColor =
    | 'generic'
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'black'
    | 'purple'
    | 'orange'
    | 'gray';

export interface CardCost {
    color: CardColor;
    amount: number;
}

export interface CardTypeInfo {
    primary: string;

    tribe?: string;

    rarity?: string;

    speed?: string;
}

export interface CardMetadata {
    setName?: string;

    cardNumber?: string;

    creator?: string;
}

export interface CardData {
    type: string | number | readonly string[];
    title: string;

    artist: string;

    colors: CardColor[];

    costs: CardCost[];

    typeInfo: CardTypeInfo;

    description: string;

    artwork?: string;

    metadata?: CardMetadata;

    damage?: number;

    armor?: number;
}
