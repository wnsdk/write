import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import MainPage from '@/pages/MainPage';
import TestPage from '@/pages/TestPage';
import ManuscriptPage from '@/pages/ManuscriptPage';
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
                    <Route path="/oauth/redirect" element={<MainPage />} />
                    <Route path="/manuscript" element={<ManuscriptPage />} />
                    <Route path="/writing" element={<WritingPage />} />
                    <Route path="/correction" element={<CorrectionPage />} />
                    <Route path="/list" element={<ListPage />} />
                </Route>

                {/* 단독으로 보여질 페이지들은 여기에 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </>
    );
}

export default App;
