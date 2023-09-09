import React, { useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Signup(props) {
  const [info, setInfo] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
  });

  const submit = () => {
    setInfo(""); // Clear any previous info message
    const payload = {
      ...formData,
    };
    axios({
      url: "http://localhost:5000/api/register", 
      method: "POST",
      data: payload,
    })
      .then((response) => {
        setInfo(response.data);
        if (response.data === "Done") {
          console.log("success")
          props.history.push("/log-in");
        }
      })
      .catch(() => {
        console.log("Error occurred");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />

      <div>
        <form className="Box-1">
          <h1 className="name">Sign up</h1>
          <p style={{ color: "white" }}>{info}</p>
          <div className="row1">
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="row1">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              id="number"
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />
          </div>

          <div className="row1">
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              id="cpassword"
              name="cpassword"
              required
              onChange={handleChange}
            />
          </div>
          <button type="button" className="submit" onClick={submit}>
            Submit
          </button>
          <p style={{ color: "white" }}>
            Have an account?{" "}
            <a style={{ color: "black" }} href="/log-in">
              Click here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
