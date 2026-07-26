import type { CardColor } from '../../../types/CardData';

import { COLOR_MAP } from '../colors';

interface Props {
    colors: CardColor[];
}

export default function InnerFrame({ colors }: Props) {
    const stops = colors
        .map(
            (color, index) =>
                `${COLOR_MAP[color]}
${index * (100 / colors.length)}%`,
        )
        .join(',');

    return (
        <div
            className="inner-frame"
            style={{
                background: `
radial-gradient(
circle at center,
${stops}
)

`,
            }}
        />
    );
}
