import { useParams } from 'react-router-dom';

export default function CopyingPage() {
    const { id } = useParams();

    return <>필사 {id}번</>;
}
