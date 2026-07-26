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

interface Props {
    data: CardData;
}

export default function Card({ data }: Props) {
    return (
        <div className="card">
            <CardBackground colors={data.colors} />

            <InnerFrame colors={data.colors} />

            <Title>{data.title}</Title>

            <Artist>{data.artist}</Artist>

            <ArtworkFrame artwork={data.artwork} />

            <CostDisplay costs={data.costs} />

            <TypeBar typeInfo={data.typeInfo} />

            <DescriptionBox>{data.description}</DescriptionBox>

            <CopyrightBorder
                text={`© ${data.metadata?.creator ?? 'Creator'}`}
            />

            <GemIcon colors={data.colors} />
        </div>
    );
}
