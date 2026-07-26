import { useRef, useState } from 'react';

import Card from './Card/Card';
import EditorPanel from './EditorPanel';
import ExportButton from './ExportButton';

import type { CardData } from '../../types/CardData';

import './CardCreator.css';

const defaultCard: CardData = {
    title: 'Ancient Dragon',

    artist: 'Alex Smith',

    colors: ['red', 'blue', 'black'],

    costs: [
        {
            color: 'red',
            amount: 3,
        },
        {
            color: 'blue',
            amount: 2,
        },
        {
            color: 'black',
            amount: 1,
        },
    ],

    typeInfo: {
        primary: 'Creature',
        secondary: 'Dragon',
        rarity: 'Legendary',
    },

    description: 'A powerful creature from forgotten lands.',

    artwork: undefined,

    metadata: {
        setName: 'First Edition',
        cardNumber: '001',
        creator: 'Alex Smith',
    },
    type: ''
};

export default function CardCreator() {
    const [card, setCard] = useState<CardData>(defaultCard);

    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div className="card-creator-page">
            {/* Left side: live card preview */}
            <div className="card-preview-area" ref={cardRef}>
                <Card data={card} />
            </div>

            {/* Right side: controls */}
            <div className="editor-area">
                <EditorPanel data={card} updateCard={setCard} />

                <ExportButton cardRef={cardRef} />
            </div>
        </div>
    );
}
