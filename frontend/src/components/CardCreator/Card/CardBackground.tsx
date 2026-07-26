import type { CardColor, CardData } from '../../../types/CardData';
import { COLOR_MAP } from '../colors';

interface Props {
    colors: CardColor[];
}

export default function CardBackground({ colors }: Props) {
    const gradient = colors
        .map(
            (color, index) =>
                `${COLOR_MAP[color]} ${index * (100 / colors.length)}%`,
        )
        .join(',');

    return (
        <div
            className="card-background"
            style={{
                background: `
radial-gradient(
circle at 30% 20%,
rgba(255,255,255,.35),
transparent 30%
),

radial-gradient(
circle,
${gradient}
)

`,
            }}
        />
    );
}
