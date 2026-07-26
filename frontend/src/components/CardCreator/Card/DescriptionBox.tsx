interface Props {
    children: string;
}

export default function DescriptionBox({ children }: Props) {
    return <div className="description-box">{children}</div>;
}
