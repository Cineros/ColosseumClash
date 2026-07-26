import type { CardColor, CardCost } from '../../types/CardData';

import { COLOR_MAP } from './colors';

interface Props {
    colors: CardColor[];

    costs: CardCost[];

    setCosts: (costs: CardCost[]) => void;
}

export default function CostEditor({ colors, costs, setCosts }: Props) {
    function updateCost(color: CardColor, amount: number) {
        const existing = costs.find((cost) => cost.color === color);

        if (existing) {
            setCosts(
                costs.map((cost) =>
                    cost.color === color
                        ? {
                              ...cost,
                              amount,
                          }
                        : cost,
                ),
            );
        } else {
            setCosts([
                ...costs,
                {
                    color,
                    amount,
                },
            ]);
        }
    }

    return (
        <div>
            <h3>Costs</h3>

            {colors.map((color) => {
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
