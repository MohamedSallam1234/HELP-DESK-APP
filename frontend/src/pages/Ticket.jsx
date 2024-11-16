import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const TicketForm = () => {
    const [formData, setFormData] = useState({
        category: '',
        subCategory: '',
    });

    const [automatedsol, setAuto] = useState('Please Enter your subcategory');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [cookies] = useCookies([]);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!cookies.token) {
                navigate('/');
                return;
            }

            if (formData.subCategory) {
                const response = await axios.get(
                    `https://localhost:5000/api/v1/automatedsol/${formData.subCategory}`,
                    {
                        withCredentials: true,
                    }
                );
                if (response.status !== 200) {
                    removeCookies('token')
                    navigate('/')

                }
                if (response.data === 'automated solution is Not Avalible') {
                    navigate('/send-ticket');
                }
                setAuto(response.data);
                setShow(true);
                console.log(response.data);
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (formData.subCategory !== '') {
            fetchData();
        }
        if(formData.category ==="others"){
            navigate('/chatHome')
        }
    }, [formData.subCategory, formData.category,cookies.token]);

    const getSubCategoryOptions = () => {
        const { category } = formData;

        switch (category) {
            case 'software':
                return [
                    'Operating system',
                    'Application software',
                    'Custom software',
                    'Integration issues',
                ];
            case 'hardware':
                return ['Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment'];
            case 'network':
                return ['Email issues', 'Internet connection problems', 'Website errors'];
            default:
                return [];
        }
    };

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
            <div style={styles.formContainer}>
                <h2>Create Ticket</h2>
                <div style={styles.selectContainer}>
                    <label htmlFor="category">Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={styles.select}
                    >
                        <option value="">Select Category</option>
                        <option value="software">Software</option>
                        <option value="hardware">Hardware</option>
                        <option value="network">Network</option>
                        <option value="others">Others</option>

                    </select>
                </div>
                <div style={styles.selectContainer}>
                    <label htmlFor="subCategory">Sub-Category:</label>
                    <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        style={styles.select}
                    >
                        <option value="">Select Sub-Category</option>
                        {getSubCategoryOptions().map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                <div style={styles.resultContainer}>
                    {show && (
                        <div>
                            <p>{automatedsol}</p>
                            <div style={styles.linksContainer}>
                                <Link to="/send-ticket" style={styles.link}>
                                    Not Helpful
                                </Link>
                                <Link to="/Home" style={styles.link}>
                                    Helpful
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    formContainer: {
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        color:'#000'
    },
    selectContainer: {
        marginBottom: '15px',
    },
    select: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
    },
    resultContainer: {
        marginTop: '20px',
    },
    linksContainer: {
        marginTop: '10px',
        display: 'flex',
        gap: '10px',
    },
    link: {
        padding: '8px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        color: '#fff',
        background: '#007bff',
        transition: 'background 0.3s',
    },
};

export default TicketForm;
