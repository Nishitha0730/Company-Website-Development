//
//
// import { useState } from 'react';
// import './ProfilePage.css';
//
// const ProfilePage = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState('');
//
//     if (!user) return <p>You are not logged in.</p>;
//
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };
//
//     const handleImageUpload = async () => {
//         if (!file) {
//             setMessage("Please select an image file.");
//             return;
//         }
//
//         const formData = new FormData();
//         formData.append("image", file);
//
//         try {
//             const res = await fetch(`http://localhost:8080/api/auth/profile/${user.username}/upload-image`, {
//                 method: 'POST',
//                 body: formData,
//                 credentials: 'include'
//             });
//
//             if (res.ok) {
//                 const updatedUser = await res.json();
//                 localStorage.setItem('user', JSON.stringify(updatedUser.data));
//                 setMessage("✅ Image uploaded successfully!");
//                 window.location.reload();
//             } else {
//                 setMessage("❌ Failed to upload image.");
//             }
//         } catch (err) {
//             console.error(err);
//             setMessage("❌ Error uploading image.");
//         }
//     };
//
//     return (
//         <div className="profile-container">
//             <h2>👤 Your Profile</h2>
//             <div className="profile-card">
//                 <img
//                     src={`http://localhost:8080/${user.profileImage || 'default_profile_image.png'}`}
//                     alt="Profile"
//                     className="profile-image"
//                 />
//                 <p><strong>Username:</strong> {user.username}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Role:</strong> {user.role}</p>
//
//                 <input type="file" accept="image/*" onChange={handleFileChange} />
//                 <button onClick={handleImageUpload} className="edit-button">Upload Image</button>
//
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// };
//
// export default ProfilePage;





import { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    if (!user) return <p>You are not logged in.</p>;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!file) {
            setMessage("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(`http://localhost:8080/api/auth/profile/${user.username}/upload-image`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (res.ok) {
                const updatedUser = await res.json();
                localStorage.setItem('user', JSON.stringify(updatedUser.data));
                setMessage("✅ Image uploaded successfully!");
                window.location.reload(); // Refresh to show the new image
            } else {
                setMessage("❌ Failed to upload image.");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Error uploading image.");
        }
    };

    // Construct the profile image URL
    const profileImageUrl = user.profileImage
        ? `http://localhost:8080/uploads/profile_images/${user.profileImage}`
        : '/default_profile_image.png';

    return (
        <div className="profile-container">
            <h2>👤 Your Profile</h2>
            <div className="profile-card">
                <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="profile-image"
                    onError={(e) => {
                        e.target.src = '/default_profile_image.png'; // Fallback if image fails to load
                    }}
                />
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>

                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleImageUpload} className="edit-button">Upload Image</button>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ProfilePage;