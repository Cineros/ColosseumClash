import type { CardColor } from '../../../types/CardData';
import { COLOR_MAP } from '../colors';

interface Props {
    colors: CardColor[];
}

interface GemProfile {
    name: string;
    type: 'jewel' | 'tigerEye' | 'diamond' | 'onyx';
    baseHex: string;
    lightStop: string;
    darkStop: string;
    glintOpacity: number;
}

// 1. Define the strict canonical display order
const CANONICAL_ORDER: Exclude<CardColor, 'generic'>[] = [
    'red',    // Ruby
    'blue',   // Sapphire
    'green',  // Emerald
    'yellow', // Tiger's Eye
    'black',  // Onyx
    'purple', // Amethyst
    'orange', // Topaz
    'gray',   // Diamond
];

// Map each color to its authentic gemstone visual profile
const GEM_PROFILES: Record<Exclude<CardColor, 'generic'>, GemProfile> = {
    red: {
        name: 'Ruby',
        type: 'jewel',
        baseHex: COLOR_MAP.red || '#a01010',
        lightStop: '#ff6b6b',
        darkStop: '#4a0000',
        glintOpacity: 0.75,
    },
    blue: {
        name: 'Sapphire',
        type: 'jewel',
        baseHex: COLOR_MAP.blue || '#164899',
        lightStop: '#60a5fa',
        darkStop: '#081d40',
        glintOpacity: 0.75,
    },
    green: {
        name: 'Emerald',
        type: 'jewel',
        baseHex: COLOR_MAP.green || '#005f08',
        lightStop: '#4ade80',
        darkStop: '#002802',
        glintOpacity: 0.7,
    },
    yellow: {
        name: "Tiger's Eye",
        type: 'tigerEye',
        baseHex: COLOR_MAP.yellow || '#d3c726',
        lightStop: '#fde047',
        darkStop: '#451a03',
        glintOpacity: 0.6,
    },
    black: {
        name: 'Onyx',
        type: 'onyx',
        baseHex: COLOR_MAP.black || '#272727',
        lightStop: '#525252',
        darkStop: '#0a0a0a',
        glintOpacity: 0.9,
    },
    purple: {
        name: 'Amethyst',
        type: 'jewel',
        baseHex: COLOR_MAP.purple || '#5e3088',
        lightStop: '#c084fc',
        darkStop: '#2e1048',
        glintOpacity: 0.75,
    },
    orange: {
        name: 'Topaz',
        type: 'jewel',
        baseHex: COLOR_MAP.orange || '#ce5600',
        lightStop: '#fb923c',
        darkStop: '#652600',
        glintOpacity: 0.75,
    },
    gray: {
        name: 'Diamond',
        type: 'diamond',
        baseHex: COLOR_MAP.gray || '#989ca5',
        lightStop: '#ffffff',
        darkStop: '#334155',
        glintOpacity: 0.95,
    },
};

export default function GemIcon({ colors }: Props) {
    // 2. Filter out 'generic' AND sort by the canonical gemstone order
    const visibleColors = colors
        .filter((c): c is Exclude<CardColor, 'generic'> => c !== 'generic')
        .sort((a, b) => CANONICAL_ORDER.indexOf(a) - CANONICAL_ORDER.indexOf(b));

    const total = visibleColors.length;

    if (total === 0) return null;

    const gemNames = visibleColors.map((c) => GEM_PROFILES[c]?.name || c).join(', ');

    return (
        <div className="gem-container" role="img" aria-label={`Gemstones: ${gemNames}`}>
            {visibleColors.map((color, index) => {
                const profile = GEM_PROFILES[color];
                if (!profile) return null;

                const maskId = `gem-mask-${index}-${color}`;
                const gradId = `gem-grad-${index}-${color}`;
                const glintId = `gem-glint-${index}-${color}`;

                // --- COMPOUND PEACOCK FAN ALGORITHM ---
                const offset = index - (total - 1) / 2;
                const maxRotateStep = total <= 3 ? 16 : Math.min(12, 80 / total);
                const maxXStep = total <= 3 ? 12 : Math.min(14, 90 / total);

                const rotateDeg = offset * maxRotateStep;
                const translateX = offset * maxXStep;
                const translateY = Math.abs(offset) * 1.5;

                return (
                    <svg
                        key={`${color}-${index}`}
                        className={`gem gem-${profile.type}`}
                        viewBox="0 0 100 140"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            zIndex: index + 1,
                            transform: `translate(${translateX}px, ${translateY}px) rotate(${rotateDeg}deg)`,
                        }}
                    >
                        <defs>
                            {/* 1. SHADERS BY GEMSTONE TYPE */}
                            {profile.type === 'tigerEye' && (
                                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#451a03" />
                                    <stop offset="25%" stopColor="#d3c726" />
                                    <stop offset="50%" stopColor="#92400e" />
                                    <stop offset="75%" stopColor="#fde047" />
                                    <stop offset="100%" stopColor="#451a03" />
                                </linearGradient>
                            )}

                            {profile.type === 'diamond' && (
                                <linearGradient id={gradId} x1="15%" y1="0%" x2="85%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="30%" stopColor="#e2e8f0" />
                                    <stop offset="60%" stopColor="#ffffff" />
                                    <stop offset="85%" stopColor="#475569" />
                                    <stop offset="100%" stopColor="#0f172a" />
                                </linearGradient>
                            )}

                            {profile.type === 'onyx' && (
                                <linearGradient id={gradId} x1="20%" y1="0%" x2="80%" y2="100%">
                                    <stop offset="0%" stopColor="#404040" />
                                    <stop offset="40%" stopColor="#181818" />
                                    <stop offset="100%" stopColor="#0a0a0a" />
                                </linearGradient>
                            )}

                            {profile.type === 'jewel' && (
                                <linearGradient id={gradId} x1="15%" y1="0%" x2="85%" y2="100%">
                                    <stop offset="0%" stopColor={profile.lightStop} stopOpacity="0.9" />
                                    <stop offset="35%" stopColor={profile.baseHex} />
                                    <stop offset="85%" stopColor={profile.baseHex} />
                                    <stop offset="100%" stopColor={profile.darkStop} />
                                </linearGradient>
                            )}

                            {/* Specular Glint Shaders */}
                            <linearGradient id={glintId} x1="0%" y1="0%" x2="100%" y2="50%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity={profile.glintOpacity} />
                                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.0" />
                            </linearGradient>

                            {/* Teardrop Silhouette Mask */}
                            <mask id={maskId}>
                                <path
                                    d="M 50 135 C 26 100 10 75 10 48 C 10 20 28 8 50 8 C 72 8 90 20 90 48 C 90 75 74 100 50 135 Z"
                                    fill="white"
                                />
                            </mask>
                        </defs>

                        {/* Base Gem Silhouette */}
                        <path
                            d="M 50 135 C 26 100 10 75 10 48 C 10 20 28 8 50 8 C 72 8 90 20 90 48 C 90 75 74 100 50 135 Z"
                            fill={`url(#${gradId})`}
                        />

                        {/* Facet Geometry Mesh */}
                        <g mask={`url(#${maskId})`}>
                            {/* Crown Table */}
                            <polygon
                                points="50,22 70,45 50,75 30,45"
                                fill="white"
                                fillOpacity={profile.type === 'diamond' ? '0.45' : '0.22'}
                            />

                            {/* Upper Crown Highlights & Shadows */}
                            <polygon
                                points="50,8 30,45 50,22"
                                fill="white"
                                fillOpacity={profile.type === 'onyx' ? '0.35' : '0.6'}
                            />
                            <polygon points="50,8 10,48 30,45" fill="white" fillOpacity="0.35" />
                            <polygon points="50,8 50,22 70,45" fill="black" fillOpacity="0.15" />
                            <polygon
                                points="50,8 70,45 90,48"
                                fill="black"
                                fillOpacity={profile.type === 'diamond' ? '0.4' : '0.25'}
                            />

                            {/* Mid Girdle Facets */}
                            <polygon points="10,48 30,45 22,85" fill="white" fillOpacity="0.3" />
                            <polygon points="30,45 50,75 22,85" fill="white" fillOpacity="0.12" />
                            <polygon points="90,48 78,85 70,45" fill="black" fillOpacity="0.3" />
                            <polygon points="70,45 78,85 50,75" fill="black" fillOpacity="0.2" />

                            {/* Pavilion Point Facets */}
                            <polygon points="22,85 50,75 50,135" fill="white" fillOpacity="0.1" />
                            <polygon points="10,48 22,85 50,135" fill="black" fillOpacity="0.15" />
                            <polygon points="50,75 78,85 50,135" fill="black" fillOpacity="0.35" />
                            <polygon
                                points="78,85 90,48 50,135"
                                fill="black"
                                fillOpacity={profile.type === 'onyx' ? '0.7' : '0.5'}
                            />

                            {/* AAA Specular Polish & Edge Glint */}
                            <path
                                d="M 50 135 C 26 100 10 75 10 48 C 10 20 28 8 50 8 Z"
                                fill={`url(#${glintId})`}
                                mixBlendMode="overlay"
                            />
                            <line
                                x1="50"
                                y1="8"
                                x2="30"
                                y2="45"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeOpacity={profile.glintOpacity}
                            />
                            <line
                                x1="30"
                                y1="45"
                                x2="50"
                                y2="75"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeOpacity={profile.glintOpacity * 0.6}
                            />
                        </g>

                        {/* Outer Gem Border */}
                        <path
                            d="M 50 135 C 26 100 10 75 10 48 C 10 20 28 8 50 8 C 72 8 90 20 90 48 C 90 75 74 100 50 135 Z"
                            stroke="rgba(15, 23, 42, 0.9)"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            })}
        </div>
    );
}