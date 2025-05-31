import { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) return;

        const user = JSON.parse(stored);
        fetch(`http://localhost:8080/api/user/profile/${user.username}`)
            .then(res => res.json())
            .then(data => setProfile(data.data))
            .catch(err => console.error("Profile fetch error:", err));
    }, []);

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <div className="profile-card">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
