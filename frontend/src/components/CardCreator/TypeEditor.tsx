import type { CardTypeInfo } from '../../types/CardData';

const RARITY_OPTIONS = [
    'Rare',
    'Uncommon',
    'Common',
    'Basic',
    'Backroom Rare',
    'Imported Rare',
    'Illicit Rare',
    'Jackpot Rare',
];

const PRIMARY_TYPE_OPTIONS = [
    'Gladiator',
    'Special',
    'Field',
    'Champion',
    'Boon',
    'Curse',
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

            <label>Rarity</label>

            <select
                value={typeInfo.rarity ?? ''}
                onChange={(e) => updateField('rarity', e.target.value)}
            >
                <option value="">Select rarity...</option>

                {RARITY_OPTIONS.map((rarity) => (
                    <option key={rarity} value={rarity}>
                        {rarity}
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

                {PRIMARY_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                        {type}
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
