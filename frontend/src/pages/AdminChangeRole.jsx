import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
    const [email, setEmail] = useState('');
    const [newRole, setNewRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:5000/api/v1/changeRole', {
                email,
                newRole
            },{
                withCredentials: true,
                credentials: 'include'
            });
            // If the response indicates that a user already exists, show an alert
            if (response.data.mssg === 'User role updated successfully') {
                alert('User role updated successfully');
                setEmail('');
                setNewRole('');
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>

            <label>
                New Role:
                <input type="number" value={newRole} onChange={e => setNewRole(e.target.value)} required />
            </label>

            <button type="submit">Change User Role</button>
        </form>
    );
}

export default Admin;
