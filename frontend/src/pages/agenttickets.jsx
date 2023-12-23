import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavbarAgent from "./NavbarAgent";

const AgentTickets = () => {
  const [show, setShow] = useState(false);
  const [tickets, setTickets] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/agenttickets",
        { withCredentials: true }
      );
      console.log(response.data)
      if (response.status !== 200) {
        navigate("/");
      }
      if (response.data.mssg === "No tickets Yet") {
        setMessage(response.data.mssg);
        setShowMessage(true);
        setShow(false);
      } else {
        setTickets(response.data);
        setShow(true);
        setShowMessage(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    fetchData();
  },[]);

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <NavbarAgent />
   

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
              marginTop:'60px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
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
            <Link
        to="/close-ticket"
        style={{
          marginTop: '12px',
          backgroundColor: '#2196F3',
          color: '#fff',
          padding: '10px 15px',
          borderRadius: '5px',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        Update ticket
      </Link>
          </div>
        ))}

{showMessage && <h1 style={{ color: 'black', marginTop:"50px"}}>{message}</h1>}

    </div>
  );
};

export default AgentTickets;
