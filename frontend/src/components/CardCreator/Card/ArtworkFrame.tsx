import { useEffect, useState } from 'react';

interface Props {
    artwork?: string;
}

const API_URL = 'http://localhost:4000';

export default function ArtworkFrame({ artwork }: Props) {
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!artwork) {
            setImgSrc(null);
            return;
        }

        if (artwork.startsWith('data:')) {
            setImgSrc(artwork);
            return;
        }

        let isMounted = true;

        const imageUrl = `${API_URL}${artwork}`;

        fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    if (isMounted && reader.result) {
                        setImgSrc(reader.result as string);
                    }
                };

                reader.readAsDataURL(blob);
            })
            .catch((err) => {
                console.warn(
                    'Failed to pre-load image as Base64, falling back to original URL.',
                    err,
                );

                if (isMounted) {
                    setImgSrc(imageUrl);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [artwork]);

    return (
        <div className="artwork-frame">
            {imgSrc ? (
                <img src={imgSrc} alt="Card artwork" />
            ) : (
                <div className="empty-art">Artwork</div>
            )}
        </div>
    );
}
