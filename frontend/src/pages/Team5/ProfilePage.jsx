// import './ProfilePage.css';
//
// const ProfilePage = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//
//     if (!user) return <p>You are not logged in.</p>;
//
//     return (
//         <div className="profile-container">
//             <h2>Your Profile</h2>
//             <div className="profile-card">
//                 <p><strong>Username:</strong> {user.username}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Role:</strong> {user.role}</p>
//             </div>
//         </div>
//     );
// };
//
// export default ProfilePage;


import './ProfilePage.css';

const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return <p>You are not logged in.</p>;

    return (
        <div className="profile-container">
            <h2>👤 Your Profile</h2>
            <div className="profile-card">
                <img
                    src={user.profileImage || '/default_profile_image.png'}
                    alt="Profile"
                    className="profile-image"
                />
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <button className="edit-button">Edit Profile</button>
            </div>
        </div>
    );
};

export default ProfilePage;
