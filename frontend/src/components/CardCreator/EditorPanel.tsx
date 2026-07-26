import type { CardData } from '../../types/CardData.ts';
import ArtworkUploader from './ArtworkUploader.tsx';
import ColorSelector from './ColorSelector';
import ExportButton from './ExportButton.tsx';
import CostEditor from './CostEditor';

interface Props {
    data: CardData;

    updateCard: React.Dispatch<React.SetStateAction<CardData>>;
}

export default function EditorPanel({ data, updateCard }: Props) {
    return (
        <div className="editor-panel">
            <h2>Card Editor</h2>

            <label>
                Title
                <input
                    value={data.title}
                    onChange={(e) =>
                        updateCard((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                />
            </label>

            <label>
                Artist
                <input
                    value={data.artist}
                    onChange={(e) =>
                        updateCard((prev) => ({
                            ...prev,
                            artist: e.target.value,
                        }))
                    }
                />
            </label>

            <ColorSelector
                selected={data.colors}
                setSelected={(colors) =>
                    updateCard((prev) => ({
                        ...prev,
                        colors,
                    }))
                }
            />
            <CostEditor
                colors={data.colors}
                costs={data.costs}
                setCosts={(costs) =>
                    updateCard((prev) => ({
                        ...prev,

                        costs,
                    }))
                }
            />

            <label>
                Type
                <input
                    value={data.type}
                    onChange={(e) =>
                        updateCard((prev) => ({
                            ...prev,
                            type: e.target.value,
                        }))
                    }
                />
            </label>

            <label>
                Description
                <textarea
                    value={data.description}
                    onChange={(e) =>
                        updateCard((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
            </label>

            <ArtworkUploader
                artwork={data.artwork}
                setArtwork={(artwork) =>
                    updateCard((prev) => ({
                        ...prev,
                        artwork,
                    }))
                }
            />
        </div>
    );
}
