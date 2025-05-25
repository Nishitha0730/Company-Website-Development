import { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // TODO: Fetch user data from backend
        const fakeProfile = { username: 'john_doe', role: 'user' };
        setProfile(fakeProfile);
    }, []);

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div>
            <h2>Profile</h2>
            <p>Username: {profile.username}</p>
            <p>Role: {profile.role}</p>
        </div>
    );
};

export default ProfilePage;
