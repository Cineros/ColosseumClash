import type { CardTypeInfo } from '../../../types/CardData';

interface Props {
    typeInfo: CardTypeInfo;
}

export default function TypeBar({ typeInfo }: Props) {
    const showSecondary =
        typeInfo.primary === 'Gladiator' ||
        typeInfo.primary === 'Special';

    return (
        <div className="type-bar">
            <span>
                {typeInfo.primary}

                {showSecondary && typeInfo.tribe && (
                    <>
                        {' — '}
                        {typeInfo.tribe}
                    </>
                )}
            </span>
        </div>
    );
}
