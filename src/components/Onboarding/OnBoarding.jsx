import React, { useState } from "react";
import "./OnBoarding.css";
import { post } from "@/api";
import Toaster from "../Toaster";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const OnBoarding = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [geography, setGeography] = useState("");
  const [age, setAge] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await post("/onboarding", { weight, height, geography, age });
      setIsLoading(false);
      if (res) {
        localStorage.setItem("accessToken", res.userId);
        setToastMessage(res.message);
        setTimeout(() => {
          navigate("/logs");
        }, 2000); // Delay of 2 seconds
      } else {
        setToastMessage(res.message);
      }
    } catch (error) {
      setIsLoading(false);
      setToastMessage("An error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-box">
        <h2>OnBoarding Details</h2>
        <p>
          Please fill in the following details to complete your onboarding
          process.
        </p>
        <form className="onboarding-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Weight : (Kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Height : (Cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Geography:</label>
            <input
              type="text"
              value={geography}
              onChange={(e) => setGeography(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        {toastMessage && (
          <Toaster
            type={toastMessage.includes("successfull") ? "success" : "error"}
            message={toastMessage}
          />
        )}
      </div>
    </div>
  );
};

export default OnBoarding;
