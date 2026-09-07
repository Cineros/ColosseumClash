import {
    PRIMARY_TYPE_OPTIONS,
    type CardTypeInfo,
    RARITY_OPTIONS,
} from '../../types/CardData';

const rarity = RARITY_OPTIONS;
const type = PRIMARY_TYPE_OPTIONS;

const SET_OPTIONS = [
    {
        id: '767e1a46-7277-4367-9fc5-e8a075814f59',
        name: 'Enter the Arena',
    },
];

interface Props {
    typeInfo: CardTypeInfo;

    damage?: number;

    armor?: number;

    health?: number;

    setTypeInfo: (typeInfo: CardTypeInfo) => void;

    setCombatStats: (damage?: number, armor?: number) => void;

    setChampionHealth: (health?: number) => void;
}

export default function TypeEditor({
    typeInfo,
    damage,
    armor,
    health,
    setTypeInfo,
    setCombatStats,
    setChampionHealth,
}: Props) {
    function updateField(field: keyof CardTypeInfo, value: string) {
        setTypeInfo({
            ...typeInfo,

            [field]: value,
        });
    }

    return (
        <div className="editor-section">
            <h3>Type Information</h3>

            <label>Set Name</label>

            <select
                value={typeInfo.setId ?? ''}
                onChange={(e) => {
                    const selectedSet = SET_OPTIONS.find(
                        (set) => set.id === e.target.value,
                    );

                    if (!selectedSet) {
                        return;
                    }

                    setTypeInfo({
                        ...typeInfo,
                        setId: selectedSet.id,
                        set: selectedSet.name,
                    });
                }}
            >
                <option value="">Select set...</option>

                {SET_OPTIONS.map((set) => (
                    <option key={set.id} value={set.id}>
                        {set.name}
                    </option>
                ))}
            </select>

            <label>Rarity</label>

            <select
                value={typeInfo.rarity ?? ''}
                onChange={(e) => updateField('rarity', e.target.value)}
            >
                <option value="">Select rarity...</option>

                {rarity.map((r) => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                ))}
            </select>

            <label>Primary Type</label>

            <select
                value={typeInfo.primary}
                onChange={(e) => {
                    const primary = e.target.value;

                    if (primary !== 'Gladiator') {
                        setCombatStats(undefined, undefined);
                    }
                    if (primary !== 'Champion') {
                        setChampionHealth(undefined);
                    }
                    updateField('primary', primary);
                }}
            >
                <option value="">Select primary type...</option>

                {type.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            {typeInfo.primary === 'Special' && (
                <>
                    <label>Speed</label>

                    <input
                        type="number"
                        min="0"
                        value={typeInfo.speed ?? ''}
                        onChange={(e) => updateField('speed', e.target.value)}
                    />
                </>
            )}

            {typeInfo.primary === 'Gladiator' && (
                <>
                    <label>Tribe</label>
                    <input
                        value={typeInfo.tribe ?? ''}
                        onChange={(e) => updateField('tribe', e.target.value)}
                    />
                    <label>Attack</label>

                    <input
                        type="number"
                        min="0"
                        value={damage ?? ''}
                        onChange={(e) =>
                            setCombatStats(Number(e.target.value), armor)
                        }
                    />

                    <label>Armor</label>

                    <input
                        type="number"
                        min="0"
                        value={armor ?? ''}
                        onChange={(e) =>
                            setCombatStats(damage, Number(e.target.value))
                        }
                    />
                </>
            )}

            {typeInfo.primary === 'Champion' && (
                <>
                    <label>Tribe</label>
                    <input
                        value={typeInfo.tribe ?? ''}
                        onChange={(e) => updateField('tribe', e.target.value)}
                    />
                    <label>Health</label>
                    <input
                        type="number"
                        min="0"
                        value={health ?? ''}
                        onChange={(e) =>
                            setChampionHealth(Number(e.target.value))
                        }
                    />
                </>
            )}
        </div>
    );
}
