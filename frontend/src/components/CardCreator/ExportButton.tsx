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

        if (!cardRef.current) {
            return;
        }

        try {
            const image = await toPng(
                cardRef.current,

                {
                    width: 750,

                    height: 1050,

                    pixelRatio: 6,

                    cacheBust: true,
                },
            );

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
        <button id='export-button' onClick={exportCard}>
            Export PNG
        </button>
    );
}
