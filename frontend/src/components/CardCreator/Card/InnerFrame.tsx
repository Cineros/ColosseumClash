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
                        135deg,
                        rgba(255, 255, 255, 0.12),
                        rgba(0, 0, 0, 0.25)
                    ),
                    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E"),
                    linear-gradient(
                        90deg,
                        ${colorStops.join(',')}
                    )
                `,
                backgroundBlendMode: 'overlay, normal, normal' 
            }}
        />
    );
}