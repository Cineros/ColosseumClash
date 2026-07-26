import type { CardData } from '../../types/CardData';

export function validateCard(card: CardData) {
    const errors: string[] = [];

    if (!card.title.trim()) {
        errors.push('Card title is required');
    }

    if (card.colors.length === 0) {
        errors.push('At least one color is required');
    }

    if (!card.description.trim()) {
        errors.push('Card description is required');
    }

    return errors;
}
