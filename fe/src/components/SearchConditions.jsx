import styles from './SearchConditions.module.scss';

const SearchConditions = ({
    mode,
    setMode,
    difficulty,
    setDifficulty,
    category,
    setCategory,
    writer,
    setWriter,
    query,
    setQuery,
    handleSearch,
}) => {
    const handleModeChange = (value) => {
        setMode((prev) => (prev.includes(value) ? prev.filter((m) => m !== value) : [...prev, value]));
    };

    const handleDifficultyChange = (value) => {
        setDifficulty((prev) => (prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]));
    };

    const handleCategoryChange = (value) => {
        setCategory((prev) => (prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]));
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                {/* <div className={styles.selectBoxGroup}>
                    <h3>모드</h3>
                    <label>
                        <input
                            type="checkbox"
                            value="writing"
                            checked={mode.includes('writing')}
                            onChange={() => handleModeChange('writing')}
                        />
                        작문
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="copying"
                            checked={mode.includes('copying')}
                            onChange={() => handleModeChange('copying')}
                        />
                        필사
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="translating"
                            checked={mode.includes('translating')}
                            onChange={() => handleModeChange('translating')}
                        />
                        번역
                    </label>
                </div> */}

                <div className={styles.selectBoxGroup}>
                    <h3>난이도</h3>
                    <label>
                        <input
                            type="checkbox"
                            value="beginner"
                            checked={difficulty.includes('beginner')}
                            onChange={() => handleDifficultyChange('beginner')}
                        />
                        초급
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="intermediate"
                            checked={difficulty.includes('intermediate')}
                            onChange={() => handleDifficultyChange('intermediate')}
                        />
                        중급
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="advanced"
                            checked={difficulty.includes('advanced')}
                            onChange={() => handleDifficultyChange('advanced')}
                        />
                        고급
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="expert"
                            checked={difficulty.includes('expert')}
                            onChange={() => handleDifficultyChange('expert')}
                        />
                        전문가
                    </label>
                </div>

                <div className={styles.selectBoxGroup}>
                    <h3>카테고리</h3>
                    <label>
                        <input
                            type="checkbox"
                            value="novel"
                            checked={category.includes('novel')}
                            onChange={() => handleCategoryChange('novel')}
                        />
                        소설
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="essay"
                            checked={category.includes('essay')}
                            onChange={() => handleCategoryChange('essay')}
                        />
                        에세이
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="dialogue"
                            checked={category.includes('dialogue')}
                            onChange={() => handleCategoryChange('dialogue')}
                        />
                        대화
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="play"
                            checked={category.includes('play')}
                            onChange={() => handleCategoryChange('play')}
                        />
                        희곡
                    </label>
                </div>

                {/* <div className={styles.inputGroup}>
                    <label>작가:</label>
                    <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} />
                </div> */}
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.searchBox}>
                    <input
                        className={styles.searchInput}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="제목 혹은 태그를 검색해보세요."
                    />
                    <button className={styles.searchButton} onClick={handleSearch}>
                        검색
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchConditions;
