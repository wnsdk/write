import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import MainPage from '@/pages/MainPage';
import TestPage from '@/pages/TestPage';

function App() {
    return (
        <>
            <Routes>
                <Route element={<Header />}>
                    {/* 헤더, 푸터와 같은 요소와 함께 보여질 페이지들은 여기에 */}
                    <Route path="/" element={<MainPage />} />
                </Route>

                {/* 단독으로 보여질 페이지들은 여기에 */}
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </>
    );
}

export default App;
