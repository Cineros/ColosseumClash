interface Props {
    children: string;
}

export default function Artist({ children }: Props) {
    return <div className="artist">{children}</div>;
}
