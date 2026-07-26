interface Props {
    text: string;
}

export default function CopyrightBorder({ text }: Props) {
    return <div className="copyright-border">{text}</div>;
}
