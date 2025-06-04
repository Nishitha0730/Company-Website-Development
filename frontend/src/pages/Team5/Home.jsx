import './Home.css';

const Home = () => (
    <div className="home-container">
        <header className="hero">
            <h1>Welcome to the Company Website</h1>
            <p>Your gateway to events, profiles, and admin tools</p>
            <a href="/register" className="cta-button">Get Started</a>
        </header>
    </div>
);

export default Home;
