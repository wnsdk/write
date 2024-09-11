import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import MainPage from '@/pages/MainPage';
import TestPage from '@/pages/TestPage';
import CopyingPage from '@/pages/CopyingPage';
import WritingPage from '@/pages/WritingPage';
import CorrectionPage from '@/pages/CorrectionPage';
import ListPage from '@/pages/ListPage';
import LoginPage from '@/pages/LoginPage';

function App() {
    return (
        <>
            <Routes>
                <Route element={<Header />}>
                    {/* 헤더, 푸터와 같은 요소와 함께 보여질 페이지들은 여기에 */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/oauth/redirect" element={<MainPage />} />
                    <Route path="/copying" element={<CopyingPage />} />
                    <Route path="/writing" element={<WritingPage />} />
                    <Route path="/correction" element={<CorrectionPage />} />
                    <Route path="/list" element={<ListPage />} />
                    <Route path="*" element={<MainPage />} />
                </Route>

                {/* 단독으로 보여질 페이지들은 여기에 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </>
    );
}

export default App;
