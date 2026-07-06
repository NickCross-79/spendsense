import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedLayout from './components/ProtectedLayout.jsx';
import LoginPage from './components/login-page/LoginPage.jsx';
import Overview from './components/overview/Overview.jsx';
import CreateBudget from './components/create-budget/CreateBudget.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedLayout />}>
                        <Route path="/" element={<Navigate to="/overview" replace />} />
                        <Route path="/overview" element={<Overview />} />
                        <Route path="/create-budget" element={<CreateBudget />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
