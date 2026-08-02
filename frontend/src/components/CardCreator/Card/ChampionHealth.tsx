interface Props {
    health: number;
}

export default function ChampionHealth({ health }: Props) {
    const safeHealth = health ?? 0;
    const digits = String(safeHealth).length;
    
    const scaleFactor = digits > 2 ? 1 - (digits - 2) * 0.15 : 1;

    return (
        <div className="health-box-wrapper"> 
            <svg 
                viewBox="0 0 100 100" 
                className="ruby-jewel-background" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* The Silver to Black metallic gradient for the setting */}
                    <linearGradient id="silver-black-setting" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />  /* Bright silver catch-light */
                        <stop offset="30%" stopColor="#a8a9ad" /> /* Mid-tone silver */
                        <stop offset="70%" stopColor="#2a2a2a" /> /* Dark steel */
                        <stop offset="100%" stopColor="#000000" /> /* Deep black shadow */
                    </linearGradient>
                </defs>

                <g className="jewel-facets">
                    {/* Top Left Highlights */}
                    <polygon points="50,25 25,10 30,30" fill="#ff4d6d" stroke="#ff4d6d" strokeWidth="0.5" />
                    <polygon points="50,25 30,30 50,40" fill="#ff758f" stroke="#ff758f" strokeWidth="0.5" />
                    <polygon points="25,10 10,25 30,30" fill="#ffb3c1" stroke="#ffb3c1" strokeWidth="0.5" />
                    <polygon points="10,25 25,45 30,30" fill="#ff4d6d" stroke="#ff4d6d" strokeWidth="0.5" />
                    <polygon points="10,25 5,45 25,45" fill="#c9184a" stroke="#c9184a" strokeWidth="0.5" />
                    
                    {/* Bottom Left Mid-Tones */}
                    <polygon points="5,45 50,95 50,75" fill="#800f2f" stroke="#800f2f" strokeWidth="0.5" />
                    <polygon points="5,45 50,75 25,45" fill="#a4133c" stroke="#a4133c" strokeWidth="0.5" />
                    <polygon points="30,30 25,45 50,40" fill="#ff8fa3" stroke="#ff8fa3" strokeWidth="0.5" />
                    <polygon points="25,45 50,75 50,40" fill="#c9184a" stroke="#c9184a" strokeWidth="0.5" />

                    {/* Top Right Shadows */}
                    <polygon points="50,25 75,10 70,30" fill="#a4133c" stroke="#a4133c" strokeWidth="0.5" />
                    <polygon points="50,25 70,30 50,40" fill="#800f2f" stroke="#800f2f" strokeWidth="0.5" />
                    <polygon points="75,10 90,25 70,30" fill="#590d22" stroke="#590d22" strokeWidth="0.5" />
                    <polygon points="90,25 75,45 70,30" fill="#3e0918" stroke="#3e0918" strokeWidth="0.5" />
                    <polygon points="90,25 95,45 75,45" fill="#2b0610" stroke="#2b0610" strokeWidth="0.5" />
                    
                    {/* Bottom Right Deep Shadows */}
                    <polygon points="95,45 50,95 50,75" fill="#3e0918" stroke="#3e0918" strokeWidth="0.5" />
                    <polygon points="95,45 50,75 75,45" fill="#590d22" stroke="#590d22" strokeWidth="0.5" />
                    <polygon points="70,30 75,45 50,40" fill="#800f2f" stroke="#800f2f" strokeWidth="0.5" />
                    <polygon points="75,45 50,75 50,40" fill="#a4133c" stroke="#a4133c" strokeWidth="0.5" />
                </g>

                {/* The Necklace Setting - Now using the silver-to-black gradient */}
                <path 
                    d="M 50,25 L 25,10 L 10,25 L 5,45 L 50,95 L 95,45 L 90,25 L 75,10 Z" 
                    fill="none" 
                    stroke="url(#silver-black-setting)" 
                    strokeWidth="3.5" 
                    strokeLinejoin="round" 
                />
            </svg>

            <div 
                className="champion-health-text" 
                style={{ transform: `scale(${scaleFactor})` }}
            > 
                {safeHealth}
            </div>
        </div>
    )
}