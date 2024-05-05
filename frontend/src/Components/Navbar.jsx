import React from "react";
import { setConstraint } from "../constraints";
import "../css/Navbar.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ProjectCotext } from "../Context/ProjectCotext";
import AddItemModal from "./AddItemModal"
import cloud from "../assets/clouds.svg"
function Navbar() {
  const token = window.localStorage.getItem("token");
  const { showPostModal, setShowPostModal } = ProjectCotext();

  const signout = () => {
    setConstraint(false);
    localStorage.clear();
    toast.success("User Loggedout ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  };
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link
            to="/"
            className="text-white  no-underline hover:underline flex justify-center flex-row gap-2 align-middle  hover:text-gray-700"
          >
            <h2>Lost and Found</h2>
          <img src={cloud} alt="Cloud" className="cloud-icon" />
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
            className={`rounded-md px-4 py-2 hover:bg-slate-300 transition ease-in-out duration-300 ${
              showPostModal ? "bg-sky-300" : "bg-sky-600"
            }`}
            onClick={() => {
              setShowPostModal(!showPostModal);
            }}
          >
            Post Item
          </button>
          <AddItemModal/>
          <ul style={{ paddingLeft: 0 }}>
            <Link
              to="/feed"
              className="text-white  no-underline hover:underline  hover:text-gray-700 transition ease-in-out duration-300"
            >
              Feed
            </Link>
            <Link
              to="/responses"
              className="text-white  no-underline hover:underline  hover:text-gray-700 transition ease-in-out duration-300"
            >
              Responses
            </Link>
            <Link
              to="/mylistings"
              className="text-white  no-underline hover:underline  hover:text-gray-700 transition ease-in-out duration-300"
            >
              My Listings
            </Link>
            <Link
              to="/log-in"
              className="text-white  no-underline hover:underline  hover:text-gray-700 transition ease-in-out duration-300"
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
