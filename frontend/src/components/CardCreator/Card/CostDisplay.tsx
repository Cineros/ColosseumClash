import type { CardCost } from '../../../types/CardData';

import { COLOR_MAP } from '../colors';

interface Props {
    costs: CardCost[];
}

export default function CostDisplay({ costs }: Props) {
    return (
        <div className="cost-display">
            {costs.map((cost) => (
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
