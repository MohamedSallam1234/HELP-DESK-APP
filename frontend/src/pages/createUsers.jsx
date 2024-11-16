import React, { useState } from 'react';
import axios from 'axios';
import "../stylesheets/createUser.css";

function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !name || !role) {
            console.error('All fields are required');
            return;
        }

        try {
            const response = await axios.post('https://localhost:5000/api/v1//createusers', {
                email,
                password,
                name,
                role
            },{
                withCredentials: true,
                credentials: 'include'
            });

            if (response.data.mssg === 'User already exists') {
                alert('A user with this email already exists');
                return;
            }
            else {
                alert('User created successfully');
                setEmail('');
                setPassword('');
                setName('');
                setRole('');
            }

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </label>

            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} required/>
            </label>

            <label>
                <select value={role} onChange={e => setRole(e.target.value)} required className="role-dropdown">
                    <option value="">Select a role</option>
                    <option value="1">User</option>
                    <option value="2">Admin</option>
                    <option value="3">Manager</option>
                </select>
            </label>

            <button type="submit">Create User</button>
        </form>
    );
}

export default CreateUser;
