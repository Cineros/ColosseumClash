import type { CardData } from '../../types/CardData';

import ArtworkUploader from './ArtworkUploader';
import ColorSelector from './ColorSelector';
import CostEditor from './CostEditor';
import TypeEditor from './TypeEditor';
import MetadataEditor from './MetadataEditor';

interface Props {
    data: CardData;

    updateCard: React.Dispatch<React.SetStateAction<CardData>>;
}

export default function EditorPanel({ data, updateCard }: Props) {
    return (
        <div className="editor-panel">
            <section className="editor-section">
                <h2>Card Information</h2>

                <label>Title</label>

                <input
                    value={data.title}
                    onChange={(e) =>
                        updateCard((prev) => ({
                            ...prev,

                            title: e.target.value,
                        }))
                    }
                />

                <label>Artist</label>

                <input
                    value={data.artist}
                    onChange={(e) =>
                        updateCard((prev) => ({
                            ...prev,

                            artist: e.target.value,
                        }))
                    }
                />
            </section>

            <section className="editor-section">
                <h2>Appearance</h2>

                <ColorSelector
                    selected={data.colors}
                    setSelected={(colors) =>
                        updateCard((prev) => ({
                            ...prev,

                            colors,
                        }))
                    }
                />

                <ArtworkUploader
                    artwork={data.artwork}
                    setArtwork={(artwork) =>
                        updateCard((prev) => ({
                            ...prev,

                            artwork,
                        }))
                    }
                />
            </section>

            <section className="editor-section">
                <h2>Game Data</h2>

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

                <TypeEditor
                    typeInfo={data.typeInfo}
                    setTypeInfo={(typeInfo) =>
                        updateCard((prev) => ({
                            ...prev,

                            typeInfo,
                        }))
                    }
                />
            </section>

            <section className="editor-section">
                <h2>Description</h2>

                <textarea
                    value={data.description}
                    rows={5}
                    onChange={(e) =>
                        updateCard((prev) => ({
                            ...prev,

                            description: e.target.value,
                        }))
                    }
                />
            </section>

            <section className="editor-section">
                <MetadataEditor
                    metadata={data.metadata}
                    setMetadata={(metadata) =>
                        updateCard((prev) => ({
                            ...prev,

                            metadata,
                        }))
                    }
                />
            </section>
        </div>
    );
}
