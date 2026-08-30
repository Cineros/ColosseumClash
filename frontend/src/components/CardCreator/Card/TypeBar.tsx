import type { CardTypeInfo } from '../../../types/CardData';

interface Props {
    typeInfo: CardTypeInfo;
}

export default function TypeBar({ typeInfo }: Props) {
    return (
        <div className='type-bar'>
            <span>
                {typeInfo.primary}

                {typeInfo.primary === 'Gladiator' && typeInfo.tribe && (
                    <>
                        {' — '}
                        {typeInfo.tribe}
                    </>
                )}
                {typeInfo.primary === 'Champion' && typeInfo.tribe && (
                    <>
                        {' — '}
                        {typeInfo.tribe}
                    </>
                )}
                {typeInfo.primary === 'Special' && typeInfo.speed && (
                    <>
                        {' — Speed: '}
                        {typeInfo.speed}
                    </>
                )}
            </span>
        </div>
    );
}
