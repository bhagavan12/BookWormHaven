import axios from 'axios';
import React, { useState } from 'react';

const UpdatePassword = ({ readerId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handlePasswordUpdate = async () => {
        if (!currentPassword || !newPassword) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/readers/update-password/${readerId}`, {
                currentPassword,
                newPassword,
            });

            setSuccess(response.data.message);
            setError(''); // Clear error
        } catch (err) {
            setError(err.response?.data?.error || 'Error updating password');
            setSuccess(''); // Clear success message
        }
    };

    return (
        <div>
            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordUpdate}>Update Password</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
           
        </div>
    );
};

export default UpdatePassword;
