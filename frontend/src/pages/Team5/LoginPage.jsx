// import { useState } from 'react';
//
// const LoginPage = () => {
//     const [form, setForm] = useState({ username: '', password: '' });
//
//     const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
//
//     const handleSubmit = e => {
//         e.preventDefault();
//         // TODO: Send POST to /auth/login and handle token
//         console.log('Logging in:', form);
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Login</h2>
//             <input name="username" onChange={handleChange} placeholder="Username" required />
//             <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
//             <button type="submit">Login</button>
//         </form>
//     );
// };
//
// export default LoginPage;

import './Auth.css';

const LoginPage = () => {
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form">
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
