import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h1 className="logo">CompanySite</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {!user && <li><Link to="/register">Register</Link></li>}
                {!user && <li><Link to="/login">Login</Link></li>}
                {user && <li><Link to="/profile">Profile</Link></li>}
                {user?.role?.toLowerCase() === "admin" && <li><Link to="/admin">Admin</Link></li>}
                {user && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
