import type { CardTypeInfo } from '../../types/CardData';

interface Props {
    typeInfo: CardTypeInfo;

    setTypeInfo: (typeInfo: CardTypeInfo) => void;
}

export default function TypeEditor({ typeInfo, setTypeInfo }: Props) {
    function updateField(field: keyof CardTypeInfo, value: string) {
        setTypeInfo({
            ...typeInfo,

            [field]: value,
        });
    }

    return (
        <div className="editor-section">
            <h3>Type Information</h3>

            <label>Rarity</label>

            <input
                value={typeInfo.rarity ?? ''}
                onChange={(e) => updateField('rarity', e.target.value)}
            />

            <label>Primary Type</label>

            <input
                value={typeInfo.primary}
                onChange={(e) => updateField('primary', e.target.value)}
            />

            <label>Secondary Type</label>

            <input
                value={typeInfo.secondary ?? ''}
                onChange={(e) => updateField('secondary', e.target.value)}
            />
        </div>
    );
}
