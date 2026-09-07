import { useEffect, useRef, useState } from "react";

interface Props {
    children: string;
}

export default function Title({ children }: Props) {
    const ref = useRef<HTMLHeadingElement>(null);
    const [fontSize, setFontSize] = useState(1.55);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const fitText = () => {
            let min = 0.5;
            let max = 1.55;
            let best = min;

            // Temporarily prevent wrapping while finding the size
            element.style.whiteSpace = "nowrap";

            while (max - min > 0.01) {
                const size = (min + max) / 2;
                element.style.fontSize = `${size}rem`;

                if (
                    element.scrollWidth <= element.clientWidth &&
                    element.scrollHeight <= element.clientHeight
                ) {
                    best = size;
                    min = size;
                } else {
                    max = size;
                }
            }

            setFontSize(best);
        };

        const observer = new ResizeObserver(fitText);
        observer.observe(element);

        fitText();

        return () => observer.disconnect();
    }, [children]);

    return (
        <h1
            ref={ref}
            className="card-title"
            style={{ fontSize: `${fontSize}rem` }}
        >
            {children}
        </h1>
    );
}