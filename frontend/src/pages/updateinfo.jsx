import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "./Navbar";

const UpdateInfo = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, removeCookies] = useCookies([]);
    const [alertMsg, setAlertMsg] = useState("");
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cookies.token) {
            removeCookies("token");
            navigate("/");
            return;
        }

        try {
            const response = await axios.put(
                "https://localhost:5000/api/v1/updateinfo",
                {
                    password: password,
                    name: name,
                },
                { withCredentials: true, credentials: "include" }
            );

            if (response.status !== 200) {
                removeCookies("token");
                navigate("/");
                return;
            }

            if (response.status === 200) {
                if (response.data.mssg === "Email is not available") {
                    setAlertMsg("Email is not available");
                } else {
                    setAlertMsg(response.data.mssg);
                }
            }
        } catch (error) {
            console.error("Error updating info:", error);
        }
    };

    useEffect(() => {
        setShowButton(name !== "" && password !== "");
    }, [password, name]);

    const styles = `
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .custom-container {
      width: 100%;
      max-width: 600px;
      text-align: center;
    }

    .custom-card {
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .custom-label {
      display: block;
      margin-bottom: 10px;
    }

    .custom-input {
      width: 100%;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      margin-bottom: 10px;
    }

    .custom-button {
      background: #007bff;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .custom-alert {
      margin-top: 10px;
      color: #007bff;
      font-weight: bold;
    }
  `;

    return (
        <>
            <Navbar /> {/* Include your Navbar here */}
            <div className="custom-container">
                <div className="custom-card">
                    <h2 className="mb-4">Update Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="custom-label">
                                Enter Name
                            </label>
                            <input
                                type="text"
                                className="custom-input"
                                id="nameInput"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="custom-label">
                                Enter Password
                            </label>
                            <input
                                type="text"
                                className="custom-input"
                                id="passwordInput"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {showButton && (
                            <button type="submit" className="custom-button">
                                Update
                            </button>
                        )}
                        <p className="mt-3 custom-alert">{alertMsg}</p>
                    </form>
                </div>
            </div>
            <style>{styles}</style>
        </>
    );
};

export default UpdateInfo;
