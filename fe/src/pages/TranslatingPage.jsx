import { useParams } from 'react-router-dom';

export default function TranslatingPage() {
    const { id } = useParams();

    return <>번역 {id}번</>;
}
