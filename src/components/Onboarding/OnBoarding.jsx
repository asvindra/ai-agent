// OnBoarding.jsx
import React, { useState } from "react";
import "./OnBoarding.css";

const OnBoarding = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [geography, setGeography] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ weight, height, geography, age });
  };

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
      </div>
    </div>
  );
};

export default OnBoarding;
