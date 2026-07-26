interface Props {
    children: React.ReactNode;
}

export default function CardPrintWrapper({ children }: Props) {
    return <div className="card-print-wrapper">{children}</div>;
}
