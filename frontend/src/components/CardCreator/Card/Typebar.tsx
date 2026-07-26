import type { CardTypeInfo } from '../../../types/CardData';

interface Props {
    typeInfo: CardTypeInfo;
}

export default function TypeBar({ typeInfo }: Props) {
    return (
        <div className="type-bar">
            <span>
                {typeInfo.rarity && `${typeInfo.rarity} `}

                {typeInfo.primary}

                {typeInfo.secondary && ` — ${typeInfo.secondary}`}
            </span>
        </div>
    );
}
