import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../css/feed.css";
import "../css/mylisting.css";
import Axios from "axios";
import lostfound from "../assets/bgimage.jpg";

export default function Feed() {
  const [lostItems, setLostItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Define a function to fetch user's items
    const fetchUserItems = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await Axios.get("http://localhost:5000/api/getItemsForUser", config);
        setLostItems(response.data); 
      } catch (error) {
        console.error("Error fetching user's items:", error);
      }
    };
    fetchUserItems(); 
  }, []);


  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return `${day}${suffix} ${month} ${year}`;
  }

  // Function to render lost items in rows of four
  const renderLostItems = () => {
    return lostItems.map((item, index) => (
      <div key={index} className="item-card">
        <img src={lostfound} alt="" />
        <h4> Name of item :{item?.name}</h4>
        <p>Question: {item?.question}</p>
        <p>Item Descriptions:{item?.description}</p>
        <p>Created At: {formatDate(item?.createdAt)}</p>
      </div>
    ));
  };
  return (
    <div>
      <Navbar />
      <div className="listing-title">
        <h2>My Listings</h2>
        <div className="title-border"></div>
      </div>
      <div className="item-container">{renderLostItems()}</div>
    </div>
  );
}
