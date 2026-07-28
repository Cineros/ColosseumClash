interface Props {
    value: number;
}

export default function ArmorIcon({ value }: Props) {
    return (
        <div className="armor-icon">
            {value}
        </div>
    );
}
