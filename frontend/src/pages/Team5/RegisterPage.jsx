// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css';
//
// const RegisterPage = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [usernameWarning, setUsernameWarning] = useState(null);
//     const navigate = useNavigate();
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//         setError(null);
//         setUsernameWarning(null);
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);
//         setUsernameWarning(null);
//
//         try {
//             const res = await fetch('http://localhost:8080/api/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });
//
//             const data = await res.json();
//
//             if (res.ok) {
//                 if (data.status === 'info' && data.code === 'USERNAME_TAKEN') {
//                     // Handle username taken warning (not error)
//                     setUsernameWarning(data.message);
//                     setIsLoading(false);
//                     return;
//                 }
//
//                 // Clear sensitive data and proceed with success
//                 setFormData(prev => ({ ...prev, password: '' }));
//                 setError({ type: 'success', message: 'Registration successful! Redirecting...' });
//                 setTimeout(() => navigate('/login'), 1500);
//             } else {
//                 // Handle errors
//                 const errorMsg = data.message ||
//                     (data.code === 'EMAIL_EXISTS'
//                         ? 'This email is already registered. Please log in or use a different email.'
//                         : 'Registration failed. Please try again.');
//
//                 setError({
//                     type: 'error',
//                     message: errorMsg,
//                     code: data.code
//                 });
//             }
//         } catch (err) {
//             setError({ type: 'error', message: 'Network error. Please check your connection.' });
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return (
//         <div className="auth-container">
//             <h2>Register</h2>
//
//             {/* Success/Error Messages */}
//             {error && (
//                 <div className={`alert ${error.type === 'success' ? 'alert-success' : 'alert-error'}`}>
//                     {error.message}
//                     {error.type === 'success' && <span className="spinner"></span>}
//                 </div>
//             )}
//
//             {/* Username Available Warning (not error) */}
//             {usernameWarning && (
//                 <div className="alert alert-warning">
//                     {usernameWarning}
//                     <div style={{ marginTop: '10px' }}>
//                         <button
//                             onClick={handleSubmit}
//                             disabled={isLoading}
//                             className="warning-continue-btn"
//                         >
//                             {isLoading ? 'Registering...' : 'Register Anyway'}
//                         </button>
//                     </div>
//                 </div>
//             )}
//
//             <form className="auth-form" onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username (4-20 characters)"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                     minLength={4}
//                     maxLength={20}
//                     pattern="[a-zA-Z0-9]+"
//                 />
//
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     minLength={6}
//                 />
//
//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? 'Registering...' : 'Register'}
//                 </button>
//
//                 <p className="auth-links">
//                     Already have an account? <a href="/login">Login here</a>
//                 </p>
//             </form>
//         </div>
//     );
// };
//
// export default RegisterPage;





import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
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
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // Clear sensitive data and proceed with success
                setFormData(prev => ({ ...prev, password: '' }));
                setError({ type: 'success', message: 'Registration successful! Redirecting...' });
                setTimeout(() => navigate('/login'), 1500);
            } else {
                // Handle errors
                let errorMsg = 'Registration failed. Please try again.';

                if (data.code === 'USERNAME_TAKEN' && data.code === 'EMAIL_EXISTS') {
                    errorMsg = 'This username and email are already taken. Please try different ones or login.';
                } else if (data.code === 'USERNAME_TAKEN') {
                    errorMsg = 'This username is already taken. Please try a different one.';
                } else if (data.code === 'EMAIL_EXISTS') {
                    errorMsg = 'This email is already registered. Please login or use a different email.';
                }

                setError({
                    type: 'error',
                    message: errorMsg,
                    code: data.code
                });
            }
        } catch (err) {
            setError({ type: 'error', message: 'Network error. Please check your connection.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>

            {/* Success/Error Messages */}
            {error && (
                <div className={`alert ${error.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                    {error.message}
                    {error.type === 'success' && <span className="spinner"></span>}
                </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username (4-20 characters)"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength={4}
                    maxLength={20}
                    pattern="[a-zA-Z0-9]+"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                <p className="auth-links">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;