import { useParams } from 'react-router-dom';

export default function WritingPage() {
    const { id } = useParams();

    return <>작문 {id}번</>;
}
