import styles from './AiTutor.module.scss';
import ChatWindow from '@/components/sidebar/ChatWindow';

export default function AiTutor() {
    return (
        <>
            <h2>AI 선생님</h2>
            <p>궁금한 게 생기면 즉시 AI 선생님에게 물어보세요!</p>
            <ChatWindow />
        </>
    );
}
