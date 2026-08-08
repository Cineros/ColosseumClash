import type { CardColor } from '../../../types/CardData';
import { COLOR_MAP } from '../colors';

interface Props {
    colors: CardColor[];
}

const CANONICAL_ORDER: Exclude<CardColor, 'generic'>[] = [
    'red',
    'blue',
    'green',
    'yellow',
    'black',
    'purple',
    'orange',
    'gray',
];

export default function InnerFrame({ colors }: Props) {
    const sortedColors = colors
        .filter((c): c is Exclude<CardColor, 'generic'> => c !== 'generic')
        .sort((a, b) => CANONICAL_ORDER.indexOf(a) - CANONICAL_ORDER.indexOf(b));

    let colorStops = sortedColors.map((color) => COLOR_MAP[color]);

    if (colorStops.length === 0) {
        colorStops = [COLOR_MAP.generic, COLOR_MAP.generic];
    } else if (colorStops.length === 1) {
        colorStops = [colorStops[0], colorStops[0]];
    }

    return (
        <div
            className="inner-frame"
            style={{
                background: `
                linear-gradient(
                    90deg,
                    ${colorStops.join(',')}
                )
                `,
            }}
        />
    );
}