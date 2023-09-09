import React from "react";
import { setConstraint } from "../constraints";
import "../css/Navbar.css";
import axios from "axios";
import LostItem from "./Lost_item";
import { Link } from "react-router-dom"; 

function Navbar() {
  const token = window.localStorage.getItem("token");

  const signout = () => {
    setConstraint(false);

    console.log("Signed out !");
    axios({
      url: "http://localhost:5000/api/signout",
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(localStorage.clear())
      .catch((error) => {
        console.log(error);
      });
  };
 return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h2>Lost and Found</h2>
          </Link>
        </div>

        <div style={token ? { display: "none" } : {}} id="login" className="signin">
          <ul>
            <Link to="/sign-up" style={{ textDecoration: "none", color: "white" }}>
              Sign-up
            </Link>
          </ul>
          <ul>
            <Link to="/log-in" style={{ textDecoration: "none", color: "white" }}>
              Log-in
            </Link>
          </ul>
        </div>
        
        <div style={token ? {} : { display: "none" }} className="postsignin">
          <div>
            <LostItem />
          </div>
          <ul>
            <Link to="/feed" style={{ textDecoration: "none", color: "white" }}>
              Feed
            </Link>
            <Link to="/responses" style={{ textDecoration: "none", color: "white" }}>
              Responses
            </Link>
            <Link to="/mylistings" style={{ textDecoration: "none", color: "white" }}>
              My Listings
            </Link>
            <Link to="/log-in" style={{ textDecoration: "none", color: "white" }} onClick={signout}>
              Sign-out
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;







{/* <div>
  <img src={profile_icon} alt="profile-icon" />
  <ul>
    <li>
      <a
        style={{ textDecoration: "none", color: "white" }}
        href="/mylistings"
      >
        My Listings
      </a>
    </li>
    <li>
      <a
        style={{ textDecoration: "none", color: "white" }}
        href="/responses"
      >
        Responses
      </a>
    </li>
    <li>
      <a
        style={{ textDecoration: "none", color: "white" }}
        onClick={signout}
        href="/log-in"
      >
        Log-out
      </a>
    </li>
  </ul>
</div> */}