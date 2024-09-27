import styles from './Menu.module.scss';

export default function Menu({ activeComponent, setActiveComponent, toggleSidebar }) {
    const handelMenuToggle = (value) => {
        if (value === activeComponent) {
            toggleSidebar();
        }
    };

    return (
        <nav className={styles.menuBar}>
            <ul>
                <li
                    onClick={() => {
                        setActiveComponent('AiTutor');
                        handelMenuToggle('AiTutor');
                    }}
                >
                    <i class="fa-duotone fa-solid fa-robot"></i>
                </li>
                <li
                    onClick={() => {
                        setActiveComponent('History');
                        handelMenuToggle('History');
                    }}
                >
                    <i class="fa-duotone fa-solid fa-clock-rotate-left"></i>
                </li>
                <li
                    onClick={() => {
                        setActiveComponent('Memo');
                        handelMenuToggle('Memo');
                    }}
                >
                    <i class="fa-duotone fa-solid fa-file-pen"></i>
                </li>
            </ul>
        </nav>
    );
}
