import styles from './MainPage.module.scss';

export default function MainPage() {
    return (
        <div className={styles.container}>
            <div className={styles.gradient_box}>
                <span className={styles.main_title}>오늘의 글감</span>
                <div className={styles.main_box}>
                    <div className={styles.title_box}>
                        <div>My Most Memorable Trip</div>
                        <div>나의 가장 기억에 남는 여행</div>
                    </div>
                    <hr />
                    <div className={styles.meta_data_box}>
                        <div className={styles.meta_data}>
                            <div>갈래</div>
                            <div>에세이</div>
                        </div>
                        <div className={styles.meta_data}>
                            <div>주제</div>
                            <div>여행</div>
                        </div>
                        <div className={styles.meta_data}>
                            <div>난이도</div>
                            <div>Intermediate</div>
                        </div>
                        <div className={styles.meta_data}>
                            <div>단어 수</div>
                            <div>300-500</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
