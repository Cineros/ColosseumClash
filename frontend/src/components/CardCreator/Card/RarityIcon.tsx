interface Props {
    rarity: string;
}

export default function RarityIcon({ rarity }: Props) {
    return (
        <svg
            className={`rarity-icon rarity-${rarity.toLowerCase()}`}
            viewBox="0 0 100 100"
        >
            <polygon
                points="50,5 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38"
            />
        </svg>
    );
}
