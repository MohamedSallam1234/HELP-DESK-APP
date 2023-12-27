// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import Navbar from './Navbar';
//
// const ViewTickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const navigate = useNavigate();
//     const [cookies, removeCookies] = useCookies([]);
//     const [show, setShow] = useState(false);
//     const [software, setSoftware] = useState([]);
//     const [hardware, setHardware] = useState([]);
//     const [network, setNetwork] = useState([]);
//     const [showsoft, setSoft] = useState(false);
//     const [showhard, setHard] = useState(false);
//     const [shownet, setNet] = useState(false);
//     const [choose, setChoose] = useState('');
//     const[Nodata,setNodata] = useState(false)
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 if (!cookies.token) {
//                     navigate('/');
//                 }
//                 const response = await axios.get('http://localhost:5000/api/v1/tickets-view', {
//                     withCredentials: true,
//                 });
//
//                 let s = [];
//                 let h = [];
//                 let n = [];
//
//                 if (response.data.mssg === 'No tickets' ) {
//                     setTickets("No tickets");
//                     setHardware("No hardware tickets");
//                     setSoftware("No software tickets");
//                     setNetwork("No network tickets");
//                     setNodata(true)
//                     setSoft(false);
//                     setHard(false);
//                     setNet(false);
//                     setShow(false);
//                 } else {
//                     setTickets(response.data);
//                     setShow(true);
//                     for (let i = 0; i < response.data.length; i++) {
//                         if (response.data[i].status === 'open') s.push(response.data[i]);
//                         if (response.data[i].status === 'pending') h.push(response.data[i]);
//                         if (response.data[i].status === 'closed') n.push(response.data[i]);
//                     }
//                 }
//
//                 if (s.length === 0) {
//                     setSoftware("No opened tickets");
//                 } else {
//                     setSoftware(s);
//                 }
//
//                 if (h.length === 0) {
//                     setHardware("No pending tickets");
//                 } else {
//                     setHardware(h);
//                 }
//                 if (n.length === 0) {
//                     setNetwork("No closed tickets");
//                 } else {
//                     setNetwork(n);
//                 }
//
//                 if (response.status !== 200) {
//                     removeCookies('token');
//                     navigate('/');
//                 }
//
//                 if (choose === 'open' &&  response.data.mssg !== "No tickets" && s.length !== 0) {
//                     setSoft(true);
//                     setHard(false);
//                     setNet(false);
//                     setShow(false);
//                     setNodata(false)
//                 } else if (choose === 'pending'&& response.data.mssg !== "No tickets" && h.length !== 0) {
//                     setSoft(false);
//                     setHard(true);
//                     setNet(false);
//                     setShow(false);
//                     setNodata(false)
//                 } else if (choose === 'closed' && response.data.mssg !== "No tickets" && n.length !== 0) {
//                     setSoft(false);
//                     setHard(false);
//                     setNet(true);
//                     setShow(false);
//                     setNodata(false)
//                 } else if (choose === '' &&  response.data.mssg !== "No tickets") {
//                     setSoft(false);
//                     setHard(false);
//                     setNet(false);
//                     setShow(true);
//                     setNodata(false)
//                 }else{
//                     setNodata(true)
//                     setSoft(false);
//                     setHard(false);
//                     setNet(false);
//                     setShow(false);
//                 }
//                 if (response.status !== 200) {
//                     removeCookies('token')
//                     navigate('/')
//
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//
//         fetchData();
//     }, [cookies.token, navigate, choose]);
//
//     return (
//         <div style={{ backgroundColor: '#fff', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Navbar />
//             <select
//                 id="choose"
//                 name="choose"
//                 value={choose}
//                 onChange={(e) => setChoose(e.target.value)}
//                 style={{
//                     width: '50%',
//                     padding: '10px',
//                     borderRadius: '4px',
//                     border: '1px solid #ddd',
//                     boxSizing: 'border-box',
//                     marginBottom: '10px',
//                     marginTop:"10px"
//                 }}
//             >
//                 <option value="">Status</option>
//                 <option value="open">Open Tickets</option>
//                 <option value="pending">Pending Tickets</option>
//                 <option value="closed">Closed Tickets</option>
//             </select>
//
//             <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
//                 <select
//                     id="choose"
//                     name="choose"
//                     value={choose}
//                     onChange={(e) => setChoose(e.target.value)}
//                     style={{
//                         width: '50%',
//                         padding: '10px',
//                         borderRadius: '4px',
//                         border: '1px solid #ddd',
//                         boxSizing: 'border-box',
//                         marginBottom: '10px',
//                         marginTop:"10px"
//                     }}
//                 >
//                     <option value="">Status</option>
//                     <option value="open">Open Tickets</option>
//                     <option value="pending">Pending Tickets</option>
//                     <option value="closed">Closed Tickets</option>
//                 </select>
//
//                 {show &&
//                     tickets.map((ticket) => (
//                         <div
//                             key={ticket._id}
//                             style={{
//                                 width: '100%',
//                                 backgroundColor: '#000',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '8px',
//                                 padding: '16px',
//                                 margin: '16px 0',
//                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                                 transition: 'transform 0.3s ease-in-out',
//                                 color: '#fff',
//                             }}
//                             onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                             onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                         >
//                             <h4 style={{ margin: '0 0 10px' }}>Status: {ticket.status}</h4>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Message:</strong> {ticket.mssg}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Issue Type:</strong> {ticket.issueType}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>SubCategory:</strong> {ticket.subCategory}
//                             </p>
//                         </div>
//                     ))}
//
//                 {showsoft &&
//                     software.map((ticket) => (
//                         <div
//                             key={ticket._id}
//                             style={{
//                                 width: '100%',
//                                 backgroundColor: '#000',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '8px',
//                                 padding: '16px',
//                                 margin: '16px 0',
//                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                                 transition: 'transform 0.3s ease-in-out',
//                                 color: '#fff',
//                             }}
//                             onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                             onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                         >
//                             <h4 style={{ margin: '0 0 10px' }}>Status: {ticket.status}</h4>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Message:</strong> {ticket.mssg}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Issue Type:</strong> {ticket.issueType}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>SubCategory:</strong> {ticket.subCategory}
//                             </p>
//                         </div>
//                     ))}
//
//                 {showhard &&
//                     hardware.map((ticket) => (
//                         <div
//                             key={ticket._id}
//                             style={{
//                                 width: '100%',
//                                 backgroundColor: '#000',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '8px',
//                                 padding: '16px',
//                                 margin: '16px 0',
//                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                                 transition: 'transform 0.3s ease-in-out',
//                                 color: '#fff',
//                             }}
//                             onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                             onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                         >
//                             <h4 style={{ margin: '0 0 10px' }}>Status: {ticket.status}</h4>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Message:</strong> {ticket.mssg}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Issue Type:</strong> {ticket.issueType}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>SubCategory:</strong> {ticket.subCategory}
//                             </p>
//                         </div>
//                     ))}
//
//                 {shownet &&
//                     network.map((ticket) => (
//                         <div
//                             key={ticket._id}
//                             style={{
//                                 width: '100%',
//                                 backgroundColor: '#000',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '8px',
//                                 padding: '16px',
//                                 margin: '16px 0',
//                                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                                 transition: 'transform 0.3s ease-in-out',
//                                 color: '#fff',
//                             }}
//                             onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//                             onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                         >
//                             <h4 style={{ margin: '0 0 10px' }}>Status: {ticket.status}</h4>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Message:</strong> {ticket.mssg}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>Issue Type:</strong> {ticket.issueType}
//                             </p>
//                             <p style={{ marginBottom: '8px' }}>
//                                 <strong>SubCategory:</strong> {ticket.subCategory}
//                             </p>
//                         </div>
//                     ))}
//
//                 {Nodata&&<h1>NO Tickets</h1>}
//             </div>
//         </div>
//     );
// };
//
// export default ViewTickets;

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
                "https://localhost:5000/api/v1/agenttickets",
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
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
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
                            to={`/close-ticket/${ticket._id}`}
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

