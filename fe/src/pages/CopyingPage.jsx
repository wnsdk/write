import { useParams } from 'react-router-dom';
import styles from './CopyingPage.module.scss';

export default function CopyingPage() {
    const { id } = useParams();

    return <div className={styles.container}>필사 {id}번</div>;
}
