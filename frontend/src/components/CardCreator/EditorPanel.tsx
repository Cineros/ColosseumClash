import type { CardData } from '../../types/CardData';
import ArtworkUploader from './ArtworkUploader';
import ColorSelector from './ColorSelector';
import CostEditor from './CostEditor';
import TypeEditor from './TypeEditor';
import MetadataEditor from './MetadataEditor';
import './EditorPanel.css';

interface Props {
    data: CardData;
    updateCard: React.Dispatch<React.SetStateAction<CardData>>;
}

export default function EditorPanel({ data, updateCard }: Props) {
    return (
        <div className="editor-panel">
            {/* SECTION 1: CORE INFO */}
            <section className="editor-section">
                <header className="section-header">
                    <h2>Card Information</h2>
                </header>
                
                <div className="field-group">
                    <label htmlFor="card-title">Title</label>
                    <input
                        id="card-title"
                        type="text"
                        placeholder="e.g., Archmage of the Arcane"
                        value={data.title}
                        onChange={(e) =>
                            updateCard((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="field-group">
                    <label htmlFor="card-artist">Artist</label>
                    <input
                        id="card-artist"
                        type="text"
                        placeholder="e.g., Raymond Swanland"
                        value={data.artist}
                        onChange={(e) =>
                            updateCard((prev) => ({
                                ...prev,
                                artist: e.target.value,
                            }))
                        }
                    />
                </div>
            </section>

            {/* SECTION 2: APPEARANCE & ART */}
            <section className="editor-section">
                <header className="section-header">
                    <h2>Appearance</h2>
                </header>

                <div className="field-group">
                    <label>Frame & Gem Colors</label>
                    <ColorSelector
                        selected={data.colors}
                        setSelected={(colors) =>
                            updateCard((prev) => ({
                                ...prev,
                                colors,
                            }))
                        }
                    />
                </div>

                <div className="field-group">
                    <label>Card Illustration</label>
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
            </section>

            {/* SECTION 3: GAME MECHANICS */}
            <section className="editor-section">
                <header className="section-header">
                    <h2>Game Data</h2>
                </header>

                <div className="field-group">
                    <label>Resource Costs</label>
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
                </div>

                <div className="field-group">
                    <label>Card Type & Subtypes</label>
                    <TypeEditor
                        typeInfo={data.typeInfo}
                        setTypeInfo={(typeInfo) =>
                            updateCard((prev) => ({
                                ...prev,
                                typeInfo,
                            }))
                        }
                    />
                </div>
            </section>

            {/* SECTION 4: FLAVOR & ABILITIES */}
            <section className="editor-section">
                <header className="section-header">
                    <h2>Description & Abilities</h2>
                </header>

                <div className="field-group">
                    <label htmlFor="card-desc">Rules Text</label>
                    <textarea
                        id="card-desc"
                        rows={5}
                        placeholder="Enter card abilities, combat stats, or flavor text..."
                        value={data.description}
                        onChange={(e) =>
                            updateCard((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                </div>
            </section>

            {/* SECTION 5: METADATA & SET INFO */}
            <section className="editor-section">
                <header className="section-header">
                    <h2>Set Metadata</h2>
                </header>
                
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