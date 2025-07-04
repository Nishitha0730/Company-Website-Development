import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Team5/Home';
import LoginPage from './pages/Team5/LoginPage';
import RegisterPage from './pages/Team5/RegisterPage';
import ProfilePage from './pages/Team5/ProfilePage';
import AdminPage from './pages/Team5/AdminPage';
import Navbar from './pages/Team5/Navbar';
import VerifyEmailPage from './pages/Team5/VerifyEmailPage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
