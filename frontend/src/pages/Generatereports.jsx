import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarManger from "./mangerNavbar";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const Generatereports = () => {
    const [tickets, setTickets] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [cookies,setCookies] = useCookies([])
    const fetchdata = async () => {
        try {

            if (!cookies.token) {
                navigate("/login");
            }
            const response = await axios.get('https://localhost:5000/api/v1/alltickets', { withCredentials: true });
            if (response.status !== 200) {
                navigate('/');
                return;
            } else if (response.data.mssg === "No tickets") {
                setEmpty(true);
            } else {
                setTickets(response.data);
                setShow(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleButtonClick = async (ticketId) => {
        try {
            console.log(ticketId);
            console.log(cookies.token);
            const userRole = localStorage.getItem('role');
            console.log(userRole);
            const response = await fetch(`https://localhost:5000/api/v1/generatereport/${ticketId}`, {
            method: 'POST',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            navigate('/');
            return;
        }

        const data = await response.json();
        console.log(data);





        alert('Report is Generated');
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
    fetchdata();
}, []);

return (
    <div>
        <NavbarManger/>
        {show &&
            tickets.map((ticket) => (
                <div
                    key={ticket._id}
                    style={{
                        width: '100%',
                        backgroundColor: '#000',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '16px',
                        margin: '16px 0',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease-in-out',
                        color: '#fff',
                        marginTop:"70px"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    <h4 style={{ margin: '0 0 10px' }}>Status: {ticket.status}</h4>
                    <p style={{ marginBottom: '8px' }}>
                        <strong>Message:</strong> {ticket.mssg}
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                        <strong>Issue Type:</strong> {ticket.issueType}
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                        <strong>SubCategory:</strong> {ticket.subCategory}
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                        <strong>Solution:</strong> {ticket.resolution}
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                        <strong>User Rating:</strong> {ticket.ticket_rating}
                    </p>
                    <button onClick={() => handleButtonClick(ticket._id)}>Generate Report</button>
                </div>
            ))}
        {empty && <h1>No Tickets</h1>}

    </div>
);
};

export default Generatereports;
