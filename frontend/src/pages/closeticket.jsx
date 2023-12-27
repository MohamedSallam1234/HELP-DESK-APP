import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import NavbarAgent from "./NavbarAgent";
const CloseTicket = () => {
    const { tid } = useParams();
    const [resolution, setResolution] = useState('');
    const navigate = useNavigate();
    const [tickets, setTickets] = useState(null);
    const [show, setShow] = useState(false);
    const [showbutton, setShowButton] = useState(false);
    const [error, seterror] = useState('');
    const [mssg, setMessage] = useState('');

    const fetchdata = async () => {
        try {
            const response = await axios.get(`https://localhost:5000/api/v1/agentticket/${tid}`, { withCredentials: true });
            console.log(response.data);
            if (response.status !== 200) {
                navigate("/");
            } else {
                setTickets([response.data]);
                setShow(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            if (resolution === "") {
                seterror("Enter Your Solution");
            } else {
                // Ticket is closed
                setShowButton(true);
                const response = await axios.put(`https://localhost:5000/api/v1/updateticket/${tid}`, { resolution: resolution }, { withCredentials: true });
                if (response.status !== 200) {
                    navigate('/');
                } else if (response.data.mssg === "Ticket is closed") {
                    setMessage("Ticket is Closed");
                    navigate('/addautomatedsolution');
                } else {
                    seterror(response.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div>
            <NavbarAgent/>
            {show &&
                tickets.map((ticket) => (
                    <div
                        key={ticket._id}
                        style={{
                            width: '90%',
                            backgroundColor: '#000',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            margin: '16px 0',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease-in-out',
                            color: '#fff',
                            marginTop: '70px',
                            marginLeft:"80px"
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.005)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >

                        <p style={{ marginBottom: '8px' }}>
                            <strong>Issue Type:</strong> {ticket.issueType}
                        </p>
                        <p style={{ marginBottom: '8px' }}>
                            <strong>SubCategory:</strong> {ticket.subCategory}
                        </p>
                        <p style={{ marginBottom: '8px' }}>
                            <strong>Message:</strong> {ticket.mssg}
                        </p>
                        <p style={{ marginBottom: '8px' }}>
                            <strong>User Email:</strong> {ticket.user.email}
                        </p>
                        <p style={{ marginBottom: '8px' }}>
                            <strong>User Name:</strong> {ticket.user.name}
                        </p>
                    </div>
                ))}

            <form onSubmit={handlesubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label style={{ marginBottom: '10px', fontSize: '18px', color: '#333' }}>Enter your solution:</label>
                <input
                    type="text"
                    id="textInput"
                    name="textInput"
                    placeholder="Enter text"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        outline: 'none',
                        marginBottom: '20px',
                        width: '80%'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '12px',
                        backgroundColor: '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease-in-out',
                    }}
                >
                    Submit
                </button>
                {error && (<h1 style={{ color: 'red', marginTop: '10px' }}>{error}</h1>)}
            </form>

        </div>
    );
};
export default CloseTicket;
