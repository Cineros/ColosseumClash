interface Props {
    artwork?: string;
    setArtwork: (image?: string) => void;
}

export default function ArtworkUploader({ artwork, setArtwork }: Props) {
    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(
            'http://localhost:4000/uploads/artwork',
            {
                method: 'POST',
                body: formData,
            },
        );

        if (!response.ok) {
            console.error('Artwork upload failed');
            return;
        }

        const data = await response.json();

        setArtwork(data.imagePath);
    }

    return (
        <div>
            <h3>Artwork</h3>

            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
            />

            {artwork && <p>Image uploaded</p>}
        </div>
    );
}
