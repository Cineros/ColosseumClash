import { useEffect, useState } from 'react';

interface Props {
    artwork?: string;
}

export default function ArtworkFrame({ artwork }: Props) {
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!artwork) {
            setImgSrc(null);
            return;
        }

        // If the artwork is already a Base64 string, just use it
        if (artwork.startsWith('data:')) {
            setImgSrc(artwork);
            return;
        }

        let isMounted = true;

        // Fetch the image (whether it's a local blob or external URL) 
        // and convert it into a Base64 Data URL to prevent html-to-image cloning errors.
        fetch(artwork)
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
                console.warn('Failed to pre-load image as Base64, falling back to original URL.', err);
                if (isMounted) {
                    setImgSrc(artwork);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [artwork]);

    return (
        <div className="artwork-frame">
            {imgSrc ? (
                <img 
                    src={imgSrc} 
                    alt="Card artwork" 
                    // No crossOrigin attribute needed anymore since it is safely encoded!
                />
            ) : (
                <div className="empty-art">Artwork</div>
            )}
        </div>
    );
}