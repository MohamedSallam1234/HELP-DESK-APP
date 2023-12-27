import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarManager from "./mangerNavbar";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const TheReport = () => {
  const [report, setReport] = useState({});
  const [empty, setEmpty] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [time, setTime] = useState("");
  const { tid } = useParams();

  const fetchdata = async () => {
    try {
      console.log(tid);
      console.log("cookies", cookies);
      if (!cookies.token) {
        navigate("/login");
      }
      const response = await axios.get(`https://localhost:5000/api/v1/get-report/${tid}`, { withCredentials: true });

      if (response.status !== 200) {
        navigate('/');
        return;
      } else if (response.data.mssg === "No Reports") {
        setEmpty(true);
      } else {
        setRating(response.data.report.agent_performance);
        setTime(response.data.report.resolution_time);
        setMessage(response.data.report.message);
        setStatus(response.data.report.ticket_status);
        setShow(true);
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
      <NavbarManager />

      <div className="content-container">
        {show && (
          <div className="report-container">
            <h2>Report Details</h2>
            <p>Status: {status}</p>
            <p>Message: {message}</p>
            <p>Resolution Time: {time}</p>
            <p>Agent Performance Rating: {rating}</p>
          </div>
        )}

        {empty && <h1>No Report</h1>}
      </div>

      <style jsx>{`
        .content-container {
          margin-top: 70px; /* Adjust the margin-top value as needed */
        }
      `}</style>
    </div>
  );
};

export default TheReport;
