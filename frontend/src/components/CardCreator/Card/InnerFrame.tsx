import type { CardColor } from '../../../types/CardData';
import { COLOR_MAP } from '../colors';

interface Props {
    colors: CardColor[];
}

export default function InnerFrame({ colors }: Props) {
    const colorStops = colors.map((color) => COLOR_MAP[color]);

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
