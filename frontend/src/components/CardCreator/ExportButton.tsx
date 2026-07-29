import { toPng } from 'html-to-image';

import { validateCard } from './cardValidation';

import type { CardData } from '../../types/CardData';

interface Props {
    cardRef: React.RefObject<HTMLDivElement | null>;

    data: CardData;
}

export default function ExportButton({ cardRef, data }: Props) {
    async function exportCard() {
        const errors = validateCard(data);

        if (errors.length) {
            alert(errors.join('\n'));

            return;
        }

        const card = cardRef.current;

        if (!card) return;

        try {
            const image = await toPng(cardRef.current, {
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight,
                canvasWidth: 3000,
                canvasHeight: 4200,
                cacheBust: true,
            });

            const filename = data.title

                .trim()

                .replace(/[^a-z0-9]/gi, '_')

                .toLowerCase();

            const link = document.createElement('a');

            link.download = `${filename || 'card'}.png`;

            link.href = image;

            link.click();
        } catch (error) {
            console.error('Export failed', error);

            alert('Could not export card.');
        }
    }

    return (
        <button id="export-button" onClick={exportCard}>
            Export PNG
        </button>
    );
}
