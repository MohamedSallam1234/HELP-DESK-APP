import React, { useEffect, useRef, useState } from "react";
import styles from "./otp.module.css";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";  
import axios from "axios"; 
import { Link, useNavigate } from "react-router-dom";

const OtpPage = () => {
  let {email} = useParams(); 
  let backend_url = "http://localhost:5000/api/v1";
  const navigate = useNavigate()
  const [values, setValues] = useState(Array(6).fill(null));
  const [isLoading, setIsLoading] = useState(false);
console.log(values.join(""))
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/otp/verify`,
        {
          email: email,
          code: values.join("")
        },
        { withCredentials: true }
      );
      // console.log(data);
      const { status, data } = response;
      // console.log(status)
      // console.log(data.user.role)
       if (status===200) {
          switch(data.user.role){
            case 1:
             // navigate(`/auth/otp/${email}`);//navigate to use
             console.log('Redirecting to user page');
             break;
             case 2:
              // navigate(`/auth/otp/${email}`);//navigate to admin
              console.log('Redirecting to admin page');
             break;
             case 3:
              // navigate(`/auth/otp/${email}`);//navigate to manger
              console.log('Redirecting to manger page');
             break;
             case 4:
              // navigate(`/auth/otp/${email}`);//navigate to agent
              console.log('Redirecting to agent page');
             break;


          }
          
        console.log(data)
      } else {
       }
    } catch (error) {
      console.log(error);
      console.log("Invalid OTP");
    }

  }

  const focusInput = (index) => {
    const input = document.getElementById(`verification-code-${index}`);
    input?.focus();
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    const index = Number(event.currentTarget.id.split("-")[2]);

    if (key === "Backspace") {
      event.preventDefault();

      if (index > 0) {
        focusInput(index - 1);
        setValues((v) => {
          const newValues = [...v];
          newValues[index - 1] = null;
          return newValues;
        });
      } else {
        setValues((v) => {
          const newValues = [...v];
          newValues[0] = null;
          return newValues;
        });
      }
    } else if (key === "ArrowLeft") {
      event.preventDefault();

      if (index > 0) {
        focusInput(index - 1);
      }
    } else if (key === "ArrowRight" || key === "Enter") {
      event.preventDefault();

      if (index < 5) {
        focusInput(index + 1);
      }
    } else if (/^[0-9]$/.test(key)) {
      event.preventDefault();

      setValues((v) => {
        const newValues = [...v];
        newValues[index] = Number(key);
        return newValues;
      });

      if (index < 5) {
        focusInput(index + 1);
      }
    }
  };

  const handlePaste = (event) => {
    const { clipboardData } = event;
    const pastedData = clipboardData.getData("text");

    if (/^[0-9]{6}$/.test(pastedData)) {
      event.preventDefault();

      const newValues = pastedData.split("").map((value) => Number(value));
      setValues(newValues);
    }
  };

  const handleFocus = (event) => {
    event.currentTarget.select();
  };

  const handleBlur = (event) => {
    event.currentTarget.selectionStart = 0;
    event.currentTarget.selectionEnd = 0;
  };
 
  const handleInput = (event) => {
    const { value } = event.currentTarget;
    const index = Number(event.currentTarget.id.split("-")[2]);

    if (/^[0-9]$/.test(value)) {
      setValues((v) => {
        const newValues = [...v];
        newValues[index] = Number(value);
        return newValues;
      });

      if (index < 5) {
        focusInput(index + 1);
      }
    }
  };

  const [resendOTPDisabled, setResendOTPDisabled] = useState(true)

  const handleResendOTP = async(e)=>{
    e.preventDefault();
    setResendOTPDisabled(true)
    try {
      const response = await axios.post(
        `${backend_url}/otp/login`,
        {
          email: email,
        },
        { withCredentials: true }
      );
  }
     catch {

     }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <p className={styles.loginIndicator}><Link to={"/login"}>Login</Link></p>
        <div className={styles.sentencesWrapper}>
          <p>
            We have sent you <span>One Time Password</span> to your email
          </p>
          <p>Please Enter OTP</p>
          {!resendOTPDisabled ? (
            <p>
              OTP has expired
            </p>
          ) : (
            <Countdown
              date={Date.now() + 180000}
              // date={Date.now() + 5000}
              renderer={(formatted) => {
                return `${
                  formatted.minutes === 0 ? "0" : formatted.minutes
                }:${formatted.seconds.toString().padStart(2, "0")}`;
              }}
              onComplete={() => {
                setResendOTPDisabled(false)
              }}
            />
          )}
        </div>
        <div className={styles.actionsWrapper}>
          <div className={styles.inputsWrapper}>
            {values.map((value, index) => (
              <input
                className={styles.input}
                id={`verification-code-${index}`}
                key={index}
                value={String(value ?? "")}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <div className={styles.buttonsWrapper}>
            <button
              className={styles.resendOtpButton}
              disabled={resendOTPDisabled}
              type="button"
              onClick={handleResendOTP}
            >
              {isLoading ? "Verifying Your Account" : "Resend OTP"}
            </button>
            <button
              className={styles.submitButton}
              disabled={isLoading}
              type="button"
              onClick={handleSubmit}
            >
              {isLoading ? "Verifying Your Account" : "Verify"}
            </button>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};


export default OtpPage;

