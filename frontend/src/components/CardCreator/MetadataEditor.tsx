import type { CardMetadata } from '../../types/CardData';

interface Props {
    metadata?: CardMetadata;

    setMetadata: (metadata: CardMetadata) => void;
}

export default function MetadataEditor({ metadata = {}, setMetadata }: Props) {
    function updateField(field: keyof CardMetadata, value: string) {
        setMetadata({
            ...metadata,

            [field]: value,
        });
    }

    return (
        <div className="editor-section">
            <h3>Card Metadata</h3>

            <label>Set Name</label>

            <input
                value={metadata.setName ?? ''}
                onChange={(e) => updateField('setName', e.target.value)}
            />

            <label>Card Number</label>

            <input
                value={metadata.cardNumber ?? ''}
                onChange={(e) => updateField('cardNumber', e.target.value)}
            />

            <label>Creator</label>

            <input
                value={metadata.creator ?? ''}
                onChange={(e) => updateField('creator', e.target.value)}
            />
        </div>
    );
}
