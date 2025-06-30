import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            if (res.ok) {
                alert('✅ Login successful');
                localStorage.setItem('user', JSON.stringify(data.data));
            } else {
                alert('❌ Login failed: ' + (data.data || 'Unknown error'));
            }
        } catch (err) {
            alert('🚨 Network error: ' + err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
