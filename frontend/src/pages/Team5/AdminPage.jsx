// const AdminPage = () => {
//     return (
//         <div>
//             <h2>Admin Dashboard</h2>
//             <p>Manage users and view admin features here.</p>
//         </div>
//     );
// };
//
// export default AdminPage;


import './AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <div className="admin-panel">
                <div className="admin-card">
                    <h4>Manage Users</h4>
                    <p>View and control user accounts</p>
                </div>
                <div className="admin-card">
                    <h4>Categories</h4>
                    <p>Create or update event categories</p>
                </div>
                <div className="admin-card">
                    <h4>System Logs</h4>
                    <p>Monitor system activity</p>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
