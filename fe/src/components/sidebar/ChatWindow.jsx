import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import styles from './ChatWindow.module.scss';
import { getResponse } from '@/apis/openai';

// OpenAI API에 메시지를 보내고 응답을 받아오는 함수
const getAIResponse = async (message) => {
    const response = getResponse(message);
    return response;
};

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [isWaitingForAI, setIsWaitingForAI] = useState(false);

    const handleSend = async (message) => {
        if (message.trim() !== '') {
            setMessages([...messages, { sender: 'User', text: message, isUser: true }]);
            setIsWaitingForAI(true); // 메시지를 보낸 후 입력을 비활성화

            // OpenAI에 메시지 전송
            const aiResponse = await getAIResponse(message);

            setMessages((prevMessages) => [...prevMessages, { sender: 'AI', text: aiResponse, isUser: false }]);
            setIsWaitingForAI(false); // AI의 답변을 받은 후 입력을 다시 활성화
        }
    };

    return (
        <div className={styles.chatWindow}>
            <MessageList messages={messages} />
            <MessageInput onSend={handleSend} isDisabled={isWaitingForAI} />
        </div>
    );
};

export default ChatWindow;
