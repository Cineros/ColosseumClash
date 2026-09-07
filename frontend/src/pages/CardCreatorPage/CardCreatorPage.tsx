import { useParams } from 'react-router-dom';

import CardCreator from '../../components/CardCreator/CardCreator';

export default function CardCreatorPage() {
    const { id } = useParams<{ id: string }>();

    return <CardCreator cardId={id} />;
}
