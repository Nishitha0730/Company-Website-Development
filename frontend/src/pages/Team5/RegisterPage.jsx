import { useState } from 'react';
import './Auth.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            if (res.ok) {
                alert('✅ Registered successfully');
                localStorage.setItem('user', JSON.stringify(data.data));
            } else {
                alert('❌ Registration failed: ' + (data.data || 'Unknown error'));
            }
        } catch (err) {
            alert('🚨 Network error: ' + err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
