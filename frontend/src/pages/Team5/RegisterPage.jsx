// import { useState } from 'react';
//
// const RegisterPage = () => {
//     const [form, setForm] = useState({ username: '', password: '' });
//
//     const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
//
//     const handleSubmit = e => {
//         e.preventDefault();
//         // TODO: Send POST to backend API
//         console.log('Registering:', form);
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Register</h2>
//             <input name="username" onChange={handleChange} placeholder="Username" required />
//             <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
//             <button type="submit">Register</button>
//         </form>
//     );
// };
//
// export default RegisterPage;


import './Auth.css';

const RegisterPage = () => {
    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form">
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
