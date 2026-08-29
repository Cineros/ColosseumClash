import type { CardData } from '../../../types/CardData';

import './Card.css';

import CardBackground from './CardBackground';
import InnerFrame from './InnerFrame';
import ArtworkFrame from './ArtworkFrame';
import Title from './Title';
import Artist from './Artist';
import TypeBar from './TypeBar';
import DescriptionBox from './DescriptionBox';
import GemIcon from './GemIcon';
import CostDisplay from './CostDisplay';
import CopyrightBorder from './CopyrightBorder';
import DamageIcon from './DamageIcon';
import ArmorIcon from './ArmorIcon';
import RarityIcon from './RarityIcon';
import ChampionHealth from './ChampionHealth';

interface Props {
    data: CardData;
}

export default function Card({ data }: Props) {
    return (
        <div className="card">
            <CardBackground />

            <InnerFrame colors={data.colors} />

            <Title>{data.title}</Title>

            <Artist>{data.artist}</Artist>

            <div className="artwork-area">
                {data.typeInfo.primary !== 'Champion' && (
                    <>
                        <CostDisplay costs={data.costs} />
                    </>
                )}
                <ArtworkFrame artwork={data.artwork} />


                {data.typeInfo.rarity && (
                    <RarityIcon rarity={data.typeInfo.rarity} />
                )}
            </div>

            <TypeBar typeInfo={data.typeInfo} />

            <DescriptionBox>{data.description}</DescriptionBox>

            <CopyrightBorder
                text={`© Colosseum Clash | Created by: ${data.metadata?.creator ?? 'Creator'}`}
            />

            {data.typeInfo.primary === 'Gladiator' && (
                <>
                    <DamageIcon value={data.damage} />

                    <ArmorIcon value={data.armor} />
                </>
            )}
            {data.typeInfo.primary === 'Champion' && (
                <>
                    <ChampionHealth health={data.health} />
                </>
            )}

            <GemIcon colors={data.colors} />
        </div>
    );
}
