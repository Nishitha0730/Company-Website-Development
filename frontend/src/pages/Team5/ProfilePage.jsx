// import { useEffect, useState } from 'react';
//
// const ProfilePage = () => {
//     const [profile, setProfile] = useState(null);
//
//     useEffect(() => {
//         // TODO: Fetch user data from backend
//         const fakeProfile = { username: 'john_doe', role: 'user' };
//         setProfile(fakeProfile);
//     }, []);
//
//     if (!profile) return <p>Loading profile...</p>;
//
//     return (
//         <div>
//             <h2>Profile</h2>
//             <p>Username: {profile.username}</p>
//             <p>Role: {profile.role}</p>
//         </div>
//     );
// };
//
// export default ProfilePage;


import './ProfilePage.css';

const ProfilePage = () => {
    const user = {
        username: 'pasindu123',
        email: 'pasindu@example.com',
        role: 'User'
    };

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <div className="profile-card">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
