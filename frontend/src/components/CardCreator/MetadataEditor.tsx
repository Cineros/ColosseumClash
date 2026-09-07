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

            <label>Creator</label>

            <input
                value={metadata.creator ?? ''}
                onChange={(e) => updateField('creator', e.target.value)}
            />
        </div>
    );
}
