import styles from './Button.module.scss';

export default function Button({ onClick, text, width, height }) {
    return (
        <button className={styles.button} onClick={onClick} style={{ width: width, height: height }}>
            {text}
        </button>
    );
}
