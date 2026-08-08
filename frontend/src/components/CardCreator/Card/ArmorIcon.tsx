interface Props {
    value: number;
}

// Utility to calculate scale based on digit count
const getScaleFactor = (val: number) => {
    const length = String(val).length;
    return length > 2 ? 2.5 / length : 1;
};

export default function ArmorIcon({ value }: Props) {
    const scale = getScaleFactor(value);

    return (
        <div className="gem-icon armor-icon">
            <span 
                className="gem-text" 
                style={{ transform: `scale(${scale})` }}
            >
                {value}
            </span>
        </div>
    );
}