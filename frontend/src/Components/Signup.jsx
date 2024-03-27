import React, { useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup(props) {
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
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
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.number || !formData.password || !formData.cpassword) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axios({
      url: "http://localhost:5000/api/register", 
      method: "POST",
      data: payload,
    })
      .then((response) => {
        setInfo(response?.data);
        if (response?.data.msg === "User created successfully") {
          navigate("/log-in");
          toast.success(response?.data?.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error?.response?.data?.error || error?.response?.data?.msg || "An error occurred";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("An error occurred", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
          <p style={{ color: "#03fc0b" }}>{info.msg}</p>
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
            <Link className="text-blue-500 no-underline hover:underline " to="/log-in">
              Click here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
