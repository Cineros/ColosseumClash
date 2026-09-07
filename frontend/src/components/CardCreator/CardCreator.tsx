import { useEffect, useRef, useState } from 'react';
import { mapDatabaseCardToCardData } from '../../utils/cardMapper';

import Card from './Card/Card';
import EditorPanel from './EditorPanel';
import ExportButton from './ExportButton';

import type { CardData } from '../../types/CardData';

import './CardCreator.css';
import CardPrintWrapper from './Card/CardPrintWrapper';

const defaultCard: CardData = {
    title: 'Ancient Dragon',

    artist: 'John Smith',

    colors: ['red', 'blue', 'black'],

    costs: [
        {
            color: 'red',
            amount: 1,
        },
        {
            color: 'blue',
            amount: 1,
        },
        {
            color: 'black',
            amount: 1,
        },
    ],

    typeInfo: {
        primary: 'Gladiator',
        tribe: 'Dragon',
        rarity: 'Legendary',
        set: 'Base',
    },

    description: 'A powerful creature from forgotten lands.',

    artwork: undefined,

    metadata: {
        creator: 'John Smith',
    },
    type: '',
};

interface Props {
    cardId?: string;
}

export default function CardCreator({ cardId }: Props) {
    const [card, setCard] = useState<CardData>(defaultCard);

    async function handleSave() {
        if (!cardId) {
            return;
        }

        const response = await fetch(`http://localhost:4000/cards/${cardId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: card.title,
                description: card.description,
                creator: card.metadata?.creator,
                artist: card.artist,
                colors: card.colors,
                costs: card.costs,
                primaryType: card.typeInfo.primary,
                tribe: card.typeInfo.tribe,
                rarity: card.typeInfo.rarity,
                speed: card.typeInfo.speed,
                damage: card.damage,
                armor: card.armor,
                health: card.health,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to save card');
        }

        const updatedCard = await response.json();

        setCard(mapDatabaseCardToCardData(updatedCard));
    }

    async function handleCreate() {
        const response = await fetch('http://localhost:4000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                setId: card.typeInfo.setId,
                title: card.title,
                description: card.description,
                creator: card.metadata?.creator,
                artist: card.artist,
                colors: card.colors,
                costs: card.costs,
                primaryType: card.typeInfo.primary,
                tribe: card.typeInfo.tribe,
                rarity: card.typeInfo.rarity,
                speed: card.typeInfo.speed,
                damage: card.damage,
                armor: card.armor,
                health: card.health,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create card');
        }

        const createdCard = await response.json();

        setCard(mapDatabaseCardToCardData(createdCard));
    }

    async function handleDelete() {
        if (!cardId) {
            return;
        }

        const confirmed = window.confirm(
            'Are you sure you want to delete this card?',
        );

        if (!confirmed) {
            return;
        }

        const response = await fetch(`http://localhost:4000/cards/${cardId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete card');
        }

        window.location.href = '/gallery';
    }

    useEffect(() => {
        if (!cardId) {
            return;
        }

        fetch(`http://localhost:4000/cards/${cardId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch card');
                }

                return response.json();
            })
            .then((databaseCard) => {
                setCard(mapDatabaseCardToCardData(databaseCard));
            })
            .catch((error) => {
                console.error(error);
            });
    }, [cardId]);

    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div className="card-creator-page">
            <div>
                <CardPrintWrapper>
                    <div ref={cardRef}>
                        <Card data={card} />
                    </div>
                </CardPrintWrapper>
            </div>

            <div className="editor-area">
                <ExportButton cardRef={cardRef} data={card} />

                {cardId ? (
                    <>
                        <button onClick={handleSave}>Save Changes</button>

                        <button onClick={handleDelete}>Delete Card</button>
                    </>
                ) : (
                    <button onClick={handleCreate}>Create Card</button>
                )}

                <EditorPanel data={card} updateCard={setCard} />
            </div>
        </div>
    );
}
