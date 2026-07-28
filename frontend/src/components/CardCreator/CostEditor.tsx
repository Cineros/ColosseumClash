import type { CardColor, CardCost } from '../../types/CardData';
import { COLOR_MAP } from './colors';

interface Props {
    colors: CardColor[];
    costs: CardCost[];
    setCosts: (costs: CardCost[]) => void;
}

// Establish strict canonical hierarchy (Generic at the top)
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

export default function CostEditor({ colors, costs, setCosts }: Props) {
    // 1. Combine 'generic', currently selected frame colors, and any already-saved cost colors
    const sortedColors = [...colors].sort(
        (a, b) => CANONICAL_ORDER.indexOf(a) - CANONICAL_ORDER.indexOf(b),
    );

    function updateCost(color: CardColor, amount: number) {
        const existing = costs.find((cost) => cost.color === color);
        let nextCosts: CardCost[];

        if (existing) {
            nextCosts = costs.map((cost) =>
                cost.color === color
                    ? {
                          ...cost,
                          amount,
                      }
                    : cost,
            );
        } else {
            nextCosts = [
                ...costs,
                {
                    color,
                    amount,
                },
            ];
        }

        // 3. Keep the saved state array sorted by canonical order as well
        nextCosts.sort(
            (a, b) =>
                CANONICAL_ORDER.indexOf(a.color) -
                CANONICAL_ORDER.indexOf(b.color),
        );

        setCosts(nextCosts);
    }

    return (
        <div>
            <h3>Costs</h3>

            {sortedColors.map((color) => {
                const current = costs.find((cost) => cost.color === color);

                return (
                    <div key={color} className="cost-editor-row">
                        <div
                            className="color-dot"
                            style={{
                                backgroundColor: COLOR_MAP[color],
                            }}
                        />

                        <input
                            type="number"
                            min="0"
                            value={current?.amount ?? 0}
                            onChange={(e) =>
                                updateCost(color, Number(e.target.value))
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
}
