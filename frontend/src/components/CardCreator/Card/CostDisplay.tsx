import type { CardColor, CardCost } from '../../../types/CardData';
import { COLOR_MAP } from '../colors';

interface Props {
    costs: CardCost[];
}

// Include 'generic' first so it sits at the top of the vertical cost column
const CANONICAL_ORDER: CardColor[] = [
    'generic',
    'red',
    'blue',
    'green',
    'yellow',
    'black',
    'purple',
    'orange',
    'gray',
];

export default function CostDisplay({ costs }: Props) {
    const validCosts = costs.filter((cost) => {
        return (
            cost.amount !== undefined &&
            cost.amount !== null &&
            cost.amount !== '' &&
            cost.amount !== 0 &&
            cost.amount !== '0'
        );
    });

    if (validCosts.length === 0) {
        return null;
    }

    const sortedCosts = [...validCosts].sort(
        (a, b) =>
            CANONICAL_ORDER.indexOf(a.color) - CANONICAL_ORDER.indexOf(b.color),
    );
    const count = sortedCosts.length;

    return (
        <div
            className="cost-display"
            style={
                {
                    '--cost-count': count,
                } as React.CSSProperties
            }
        >
            {sortedCosts.map((cost) => (
                <div
                    key={cost.color}
                    className="cost-circle"
                    style={{
                        backgroundColor: COLOR_MAP[cost.color],
                    }}
                >
                    {cost.amount}
                </div>
            ))}
        </div>
    );
}
