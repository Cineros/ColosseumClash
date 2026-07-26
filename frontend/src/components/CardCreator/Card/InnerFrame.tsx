import type { CardColor } from '../../../types/CardData';
import { COLOR_MAP } from '../colors';

interface Props {
    colors: CardColor[];
}

// Keep the exact same order as GemIcon to guarantee visual alignment
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
    // 1. Filter out 'generic' AND sort by canonical order
    const sortedColors = colors
        .filter((c): c is Exclude<CardColor, 'generic'> => c !== 'generic')
        .sort((a, b) => CANONICAL_ORDER.indexOf(a) - CANONICAL_ORDER.indexOf(b));

    // 2. Map to hex codes
    let colorStops = sortedColors.map((color) => COLOR_MAP[color]);

    // 3. Safety Fallbacks for valid CSS linear-gradient syntax (requires >= 2 stops)
    if (colorStops.length === 0) {
        // If purely generic or empty, default to a solid generic frame
        colorStops = [COLOR_MAP.generic, COLOR_MAP.generic];
    } else if (colorStops.length === 1) {
        // If only 1 color remains, duplicate it so linear-gradient(90deg, #hex, #hex) is valid
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