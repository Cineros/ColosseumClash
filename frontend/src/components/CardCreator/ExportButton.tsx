import { toPng } from 'html-to-image';

interface Props {
    cardRef: React.RefObject<HTMLDivElement>;
}

export default function ExportButton({ cardRef }: Props) {
    async function exportCard() {
        if (!cardRef.current) return;

        const dataURL = await toPng(cardRef.current, {
            pixelRatio: 3,
        });

        const link = document.createElement('a');

        link.download = 'card.png';

        link.href = dataURL;

        link.click();
    }

    return <button onClick={exportCard}>Export PNG</button>;
}
