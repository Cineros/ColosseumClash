import ReactMarkdown from "react-markdown";

interface Props {
    children: string;
}

export default function DescriptionBox({ children }: Props) {
    return (
        <div className="description-box">
            <div className="description-content">
                <ReactMarkdown>
                    {children}
                </ReactMarkdown>
            </div>
        </div>
    );
}
