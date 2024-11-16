import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const TicketForm = () => {
    const [cookies, setCookies] = useCookies([]);
    const [problem, setProblem] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [choose, setChoose] = useState([]);
    const [priority, setPriority] = useState('');
    const [mssg, setMessg] = useState('');
    const navigate = useNavigate();
    const [Created, setCreated] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cookies.token) navigate('/');

        try {
            const response = await axios.post(
                'https://localhost:5000/api/v1/createticket',
                {
                    issueType: problem,
                    subCategory,
                    priority,
                    mssg,
                },
                { withCredentials: true }
            );
            if (response.status !== 200) {
                removeCookies('token')
                navigate('/')

            }
            if (response.status === 200) {
                setCreated('Your Problem Is Sent, Thank You');
                setTimeout(() => {
                    navigate('/Home');
                }, 2000);
            } else {
                setCreated('Problem Sending Your Message. Try again later.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const updateSubCategory = () => {
            switch (problem) {
                case 'software':
                    setChoose(['Operating system', 'Application software', 'Custom software', 'Integration issues']);
                    break;
                case 'hardware':
                    setChoose(['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment']);
                    break;
                case 'network':
                    setChoose(['Email issues', 'Internet connection problems', 'Website errors']);
                    break;
                default:
                    setChoose([]);
                    break;
            }
        };
        updateSubCategory();
        if (problem !== '' && subCategory !== '' && priority !== '' && mssg !== '') setShow(true);
        else setShow(false);
    }, [problem, subCategory, priority, mssg]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            marginTop: '30px',// Set to 100% of the viewport height>
        }}>
            <Navbar />

            <form
                onSubmit={handleSubmit}
                style={{
                    padding: '20px',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}
            >
                <label
                    htmlFor="select1"
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                    }}
                >
                    Category
                </label>
                <select
                    id="problem"
                    name="problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        boxSizing: 'border-box',
                        marginBottom: '10px',
                    }}
                >
                    <option value="">Choose Category</option>
                    <option value="software">Software</option>
                    <option value="hardware">Hardware</option>
                    <option value="network">Network</option>
                </select>

                <label
                    htmlFor="select2"
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                    }}
                >
                    Sub-Category
                </label>
                <select
                    id="subCategory"
                    name="subCategory"
                    value={subCategory}
                    onChange={(e) => {
                        setSubCategory(e.target.value);
                    }}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        boxSizing: 'border-box',
                        marginBottom: '10px',
                    }}
                >
                    <option value="">Choose Sub-Category</option>
                    {choose.map((option) => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="select3"
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                    }}
                >
                    Choose Priority
                </label>
                <select
                    id="priority"
                    name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        boxSizing: 'border-box',
                        marginBottom: '10px',
                    }}
                >
                    <option value="">Choose Priority</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                </select>

                <label
                    htmlFor="textInput"
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                    }}
                >
                    Enter your text here:
                </label>
                <input
                    type="text"
                    id="textInput"
                    name="textInput"
                    placeholder="Enter text"
                    value={mssg}
                    onChange={(e) => setMessg(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        boxSizing: 'border-box',
                        marginBottom: '10px',
                    }}
                />

                {show && (
                    <input
                        type="submit"
                        value="Submit"
                        style={{
                            background: '#007bff',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background 0.3s',
                        }}
                    />
                )}
                {show && (
                    <p
                        style={{
                            marginTop: '10px',
                            color: '#007bff',
                            fontWeight: 'bold',
                        }}
                    >
                        {Created}
                    </p>
                )}
            </form>
        </div>

    );
};

export default TicketForm;
