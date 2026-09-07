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

export const RARITY_OPTIONS = [
    'Rare',
    'Uncommon',
    'Common',
    'Basic',
    'Backroom Rare',
    'Imported Rare',
    'Illicit Rare',
    'Jackpot Rare',
];

export const PRIMARY_TYPE_OPTIONS = [
    'Gladiator',
    'Special',
    'Field',
    'Champion',
    'Boon',
    'Curse',
];

export interface CardTypeInfo {
    primary: string;

    set: string;
    setId?: string;

    tribe?: string;

    rarity?: string;

    speed?: string;
}



export interface CardMetadata {

    cardNumber?: number;

    creator?: string;
}

export interface CardData {
    type: string | number | readonly string[];

    title: string;

    artist: string;

    colors: CardColor[];

    costs: CardCost[];

    typeInfo: CardTypeInfo;

    description?: string;

    artwork?: string;

    metadata?: CardMetadata;

    damage?: number;

    armor?: number;

    health?: number;
}
