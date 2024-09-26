import styles from "./SearchConditions.module.scss";
import CheckBox from "@/components/input/CheckBox";
import { categories, difficulties } from "@/constants/constants";

const SearchConditions = ({
  mode,
  setMode,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  query,
  setQuery,
  handleSearch,
}) => {
  const handleModeChange = (value) => {
    setMode((prev) =>
      prev.includes(value) ? prev.filter((m) => m !== value) : [...prev, value]
    );
  };

  const handleDifficultyChange = (value) => {
    setDifficulty((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const handleCategoryChange = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
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

        <div className={styles.checkBoxGroup}>
          <h3>난이도</h3>
          {Object.entries(difficulties).map(([key, value]) => (
            <CheckBox
              label={value}
              value={key}
              checked={difficulty.includes(key)}
              onChange={() => handleDifficultyChange(key)}
              key={key}
            />
          ))}
        </div>

        <div className={styles.checkBoxGroup}>
          <h3>카테고리</h3>
          {Object.entries(categories).map(([key, value]) => (
            <CheckBox
              label={value}
              value={key}
              checked={category.includes(key)}
              onChange={() => handleCategoryChange(key)}
              key={key}
            />
          ))}
        </div>
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
