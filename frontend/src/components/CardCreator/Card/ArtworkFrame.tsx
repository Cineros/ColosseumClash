interface Props {
    artwork?: string;
}

export default function ArtworkFrame({ artwork }: Props) {
    return (
        <div className="artwork-frame">
            {artwork ? (
                <img src={artwork} alt="Card artwork" />
            ) : (
                <div className="empty-art">Artwork</div>
            )}
        </div>
    );
}
