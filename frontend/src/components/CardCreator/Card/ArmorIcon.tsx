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
        <div className="gem-wrapper" style={{ right: '28px' }}>
            {/*<div className="gem-ring"></div>*/}
            <div className="gem-icon armor-icon">
                <span
                    className="gem-text"
                    style={{ transform: `scale(${scale})` }}
                >
                    {value}
                </span>
            </div>
        </div>
    );
}
