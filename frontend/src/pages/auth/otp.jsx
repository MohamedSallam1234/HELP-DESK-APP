import React, { useEffect, useRef, useState } from "react";
import styles from "./otp.module.css";

import Countdown from "react-countdown";

const OtpPage = () => {
  const [values, setValues] = useState(Array(6).fill(null));
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async () => {
    const isFull = values.every((value) => value !== null);

    if (!isFull) return alert("Please enter the verification code");

    try {
      setIsLoading(true);
      alert("api");
      //   await api.post('/auth/verify', {
      //     token: values.join(''),
      //   });
      router.push("/");
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [resendOTPDisabled, setResendOTPDisabled] = useState(true)

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <p className={styles.loginIndicator}>LOGIN</p>
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
              onClick={() => {
                setResendOTPDisabled(true)
              }}
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
