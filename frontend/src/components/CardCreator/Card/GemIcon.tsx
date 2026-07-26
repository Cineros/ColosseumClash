import type { CardColor } from '../../../types/CardData';

import { COLOR_MAP } from '../colors';

interface Props {
    colors: CardColor[];
}

export default function GemIcon({ colors }: Props) {
    return (
        <div className="gem-container">
            {colors.map((color) => (
                <div
                    key={color}
                    className="gem"
                    style={{
                        backgroundColor: COLOR_MAP[color],
                    }}
                />
            ))}
        </div>
    );
}
