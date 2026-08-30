interface Props {
    set: string;
}

export default function SetIcon({ set }: Props) {
    return (
        <svg
            className={`set-icon set-${set.toLowerCase()}`}
            viewBox="0 0 100 100"
        >
            <polygon
                points="50,5 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38"
            />
        </svg>
    );
}
