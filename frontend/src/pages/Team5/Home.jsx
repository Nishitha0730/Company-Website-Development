import './Home.css'; // Import custom styles

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero">
                <h1>Welcome to the Company Website</h1>
                <p>Your gateway to events, profiles, and admin tools</p>
                <a href="/register" className="cta-button">Get Started</a>
            </header>

            <section className="features">
                <div className="feature-card">
                    <h3>🧑‍💼 User Registration</h3>
                    <p>Join us and manage your event bookings effortlessly.</p>
                </div>
                <div className="feature-card">
                    <h3>🔒 Secure Login</h3>
                    <p>Access your account and stay updated on your events.</p>
                </div>
                <div className="feature-card">
                    <h3>🛠️ Admin Tools</h3>
                    <p>Manage categories, users, and system features with ease.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
