import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Auth.css';

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [message, setMessage] = useState('Verifying your email...');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/auth/verify-email?token=${token}`);
                const data = await res.json();

                if (res.ok) {
                    setMessage(data.message);

                    setTimeout(() => navigate('/login'), 3000);
                } else {
                    setError(data.message || 'Email verification failed');
                }
            } catch (err) {
                setError('Network error during verification');
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setError('No verification token provided');
        }
    }, [token, navigate]);

    return (
        <div className="auth-container">
            <h2>Email Verification</h2>
            {error ? (
                <div className="alert alert-error">{error}</div>
            ) : (
                <div className="alert alert-success">
                    {message}
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmailPage;