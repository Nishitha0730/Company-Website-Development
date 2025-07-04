import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.data));
                navigate('/profile');
            } else {
                let errorMsg = data.message || 'Login failed';

                if (data.message && data.message.toLowerCase().includes('not verified')) {
                    errorMsg = 'Email not verified. Please check your email for the verification link.';
                }

                setError(errorMsg);
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p className="auth-links">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;