import React from 'react';
import styles from './MessageList.module.scss';

const MessageList = ({ messages }) => {
    return (
        <div className={styles.messageList}>
            {messages.map((message, index) => (
                <div key={index} className={`${styles.message} ${message.isUser ? styles.right : styles.left}`}>
                    <span className={styles.text}>{message.text}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
