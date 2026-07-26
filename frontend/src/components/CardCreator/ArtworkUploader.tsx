interface Props {
    artwork?: string;
    setArtwork: (image?: string) => void;
}

export default function ArtworkUploader({ artwork, setArtwork }: Props) {
    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        const imageURL = URL.createObjectURL(file);

        setArtwork(imageURL);
    }

    return (
        <div>
            <h3>Artwork</h3>

            <input type="file" accept="image/*" onChange={handleUpload} />

            {artwork && <p>Image selected</p>}
        </div>
    );
}
