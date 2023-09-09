import React, { useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Spinner } from "react-bootstrap";

function Login() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  function login() {
    setLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios({
      url: "http://localhost:5000/api/login",
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        console.log("Response is:", response);
        if (response.data.token && response.data.userId) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.userId));
          navigate("/feed");
        } else {
          setInfo("Invalid credentials");
        }
      })
      .then((response) => {
        console.log("Response is:", response);
        if (response.data.token && response.data.userId) {
          localStorage.setItem("token", response.data.token);
          console.log(response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.userId));
          console.log(response.data.userId);
          navigate("/feed");
        } else {
          setInfo("Invalid credentials");
        }
      })

      .catch((error) => {
        setLoading(false);
        console.log(error);
        setInfo("Error occurred");
      });
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <form className="Box-1 login">
          <h1>Log in</h1>
          <p style={{ color: "white" }}>{info}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email id"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
          <button type="button" className="submit" onClick={login}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <a style={{ color: "black" }} href="/sign-up">
              Click here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
