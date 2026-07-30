interface Props {
    health: number;
}

export default function ChampionHealth({ health }: Props) {
    return (
        <div className="health-box-wrapper"> 
            <div className="champion-health"> 
                {health}
            </div>
        </div>
    )
}