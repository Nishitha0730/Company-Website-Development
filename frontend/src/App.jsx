import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Team5/Navbar';
import Home from './pages/Team5/Home';
import RegisterPage from './pages/Team5/RegisterPage';
import LoginPage from './pages/Team5/LoginPage';
import ProfilePage from './pages/Team5/ProfilePage';
import AdminPage from './pages/Team5/AdminPage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}

export default App;
