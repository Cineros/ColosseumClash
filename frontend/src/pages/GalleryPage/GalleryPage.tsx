import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { mapDatabaseCardToCardData } from '../..//utils/cardMapper.ts';
import Card from '../../components/CardCreator/Card/Card.tsx';

interface Card {
    id: string;
    cardNumber: number;
    title: string;
    description?: string;
    creator: string;
    artist: string;
    colors: string[];
    costs: {
        color: string;
        amount: number;
    }[];
    primaryType: string;
    tribe?: string;
    rarity?: string;
    speed?: string;
    damage?: number;
    armor?: number;
    health?: number;
    artwork?: string;
    set: {
        id: string;
        name: string;
    };
}

export default function GalleryPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCard, setEditingCard] = useState<Card | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/cards')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cards');
                }

                return response.json();
            })
            .then((data) => {
                setCards(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading cards...</p>;
    }

    return (
        <div>
            <h1>Gallery</h1>

            <p>Browse created cards and templates.</p>

            {cards.length === 0 ? (
                <p>No cards found.</p>
            ) : (
                <div>
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => navigate(`/creator/${card.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Card data={mapDatabaseCardToCardData(card)} />
                        </div>
                    ))}
                </div>
            )}
            {editingCard && (
                <div>
                    <h2>Editing: {editingCard.title}</h2>

                    <button onClick={() => setEditingCard(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
