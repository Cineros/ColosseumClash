import { useRef, useState } from 'react';

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
    },

    description: 'A powerful creature from forgotten lands.',

    artwork: undefined,

    metadata: {
        setName: 'First Edition',
        cardNumber: '001',
        creator: 'John Smith',
    },
    type: '',
};

export default function CardCreator() {
    const [card, setCard] = useState<CardData>(defaultCard);

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
                <EditorPanel data={card} updateCard={setCard} />
            </div>
        </div>
    );
}
