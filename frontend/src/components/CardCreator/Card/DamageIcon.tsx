import React from 'react';

interface Props {
    value: number;
}

// Utility to calculate scale based on digit count
const getScaleFactor = (val: number) => {
    const length = String(val).length;
    // Base scale is 1. If length > 2, shrink it proportionally. 
    // Example: 3 digits = 0.83 scale, 4 digits = 0.62 scale.
    return length > 2 ? 2.5 / length : 1;
};

export default function DamageIcon({ value }: Props) {
    const scale = getScaleFactor(value);

    return (
        <div className="gem-icon damage-icon">
            <span 
                className="gem-text" 
                style={{ transform: `scale(${scale})` }}
            >
                {value}
            </span>
        </div>
    );
}