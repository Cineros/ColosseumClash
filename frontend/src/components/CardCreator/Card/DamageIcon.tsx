interface Props {
    value: number;
}

export default function DamageIcon({ value }: Props) {
    return (
        <div className="damage-icon">
            {value}
        </div>
    );
}
