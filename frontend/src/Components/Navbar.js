import React from "react";
import { setConstraint } from "../constraints";
import "../css/Navbar.css";
import axios from "axios";
import LostItem from "./Lost_item";
import { Link } from "react-router-dom";
import { ProjectCotext } from "../Context/ProjectCotext";
function Navbar() {
  const token = window.localStorage.getItem("token");
  const { showPostModal, setShowPostModal } = ProjectCotext();

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
          <Link
            to="/"
            className="text-white  no-underline hover:underline  hover:text-gray-700"
          >
            <h2>Lost and Found</h2>
          </Link>
        </div>

        <div
          style={token ? { display: "none" } : {}}
          id="login"
          className="signin"
        >
          <ul>
            <Link
              to="/sign-up"
              className="text-white  no-underline hover:underline  hover:text-gray-700"
            >
              Sign-up
            </Link>
          </ul>
          <ul>
            <Link
              to="/log-in"
              className="text-white  no-underline hover:underline  hover:text-gray-700"
            >
              Log-in
            </Link>
          </ul>
        </div>

        <div style={token ? {} : { display: "none" }} className="postsignin">
          <button
            className={`rounded-md px-4 py-2 ${
              showPostModal ? "bg-sky-300" : "bg-sky-600"
            }`}
            onClick={() => {
              setShowPostModal(!showPostModal);
            }}
          >
            Post Item
          </button>
          <ul style={{ paddingLeft: 0 }}>
            <Link
              to="/feed"
              className="text-white  no-underline hover:underline  hover:text-gray-700"
            >
              Feed
            </Link>
            <Link
              to="/responses"
              className="text-white  no-underline hover:underline  hover:text-gray-700"
            >
              Responses
            </Link>
            <Link
              to="/mylistings"
              className="text-white  no-underline hover:underline  hover:text-gray-700"
            >
              My Listings
            </Link>
            <Link
              to="/log-in"
              className="text-white  no-underline hover:underline  hover:text-gray-700"
              onClick={signout}
            >
              Sign-out
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
