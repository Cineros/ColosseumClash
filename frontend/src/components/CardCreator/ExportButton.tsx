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
    async function exportPrintCard() {
        const errors = validateCard(data);

        if (errors.length) {
            alert(errors.join('\n'));
            return;
        }

        const card = cardRef.current;
        if (!card) return;

        try {
            // Export the card at the finished trim size (2.5" × 3.5" @ 300 DPI)
            const imageUrl = await toPng(card, {
                width: card.offsetWidth,
                height: card.offsetHeight,
                canvasWidth: 3000,
                canvasHeight: 4200,
                cacheBust: true,
                skipFonts: false, 
                fetchRequestInit: {
                    mode: 'no-cors' // Helps bypass strict CORS on some browsers
                }
            });

            const img = new Image();
            img.src = imageUrl;

            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject();
            });

            const bleed = 38; // ≈ 1/8" @ 300 DPI

            const trimWidth = 3000;
            const trimHeight = 4200;

            const canvas = document.createElement('canvas');
            canvas.width = trimWidth + bleed * 2;
            canvas.height = trimHeight + bleed * 2;

            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas unavailable');

            // Background
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const radius = 20;

            const left = bleed;
            const right = bleed + trimWidth;
            const top = bleed;
            const bottom = bleed + trimHeight;

            ctx.save();

            ctx.beginPath();
            ctx.roundRect(left, top, trimWidth, trimHeight, radius);
            ctx.clip();

            ctx.drawImage(img, left, top, trimWidth, trimHeight);

            ctx.restore();

            ctx.save();

            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.setLineDash([14, 10]);

            ctx.beginPath();
            ctx.roundRect(left, top, trimWidth, trimHeight, radius);
            ctx.stroke();

            ctx.restore();

            const mark = 20;
            const offset = 12;

            ctx.beginPath();

            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.setLineDash([]);

            ctx.moveTo(left - offset, top);
            ctx.lineTo(left - offset - mark, top);
            ctx.moveTo(left, top - offset);
            ctx.lineTo(left, top - offset - mark);

            ctx.moveTo(right + offset, top);
            ctx.lineTo(right + offset + mark, top);
            ctx.moveTo(right, top - offset);
            ctx.lineTo(right, top - offset - mark);

            ctx.moveTo(left - offset, bottom);
            ctx.lineTo(left - offset - mark, bottom);
            ctx.moveTo(left, bottom + offset);
            ctx.lineTo(left, bottom + offset + mark);

            ctx.moveTo(right + offset, bottom);
            ctx.lineTo(right + offset + mark, bottom);
            ctx.moveTo(right, bottom + offset);
            ctx.lineTo(right, bottom + offset + mark);

            ctx.stroke();

            const filename = data.title
                .trim()
                .replace(/[^a-z0-9]/gi, '_')
                .toLowerCase();

            const link = document.createElement('a');
            link.download = `${filename || 'card'}_print.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error(err);
            alert('Could not export print version.');
        }
    }

    return (
        <>
            <button id="export-button" onClick={exportCard}>
                Export PNG
            </button>
            <button id="export-print-button" onClick={exportPrintCard}>
                Export Print PNG
            </button>
        </>
    );
}
