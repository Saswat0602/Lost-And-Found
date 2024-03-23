import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/feed.css";
import "../css/mylisting.css";
import Axios from "axios";
import lostfound from "../assets/bgimage.jpg";
import LoaderSkeleton from "../Components/LoaderSkeleton";
import { Link } from "react-router-dom";

export default function Feed() {
  const [lostItems, setLostItems] = useState([]);
  const token = localStorage.getItem("token");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    // Define a function to fetch user's items
    const fetchUserItems = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await Axios.get(
          "http://localhost:5000/api/getItemsForUser",
          config
        );
        setLostItems(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
      <Link
        to={`/mylistings/item/${item?._id}`}
        key={index}
        className="item-card no-underline"
      >
        <img src={lostfound} alt="" />
        <h4 className="text-start"> Name of item :{item?.name}</h4>
        <p className="text-start">Question: {item?.question}</p>
        <p className="text-start">Item Descriptions:{item?.description}</p>
        <p>Created At: {formatDate(item?.createdAt)}</p>
      </Link>
    ));
  };

  return (
    <div>
      <Navbar />
      {Loading ? (
        <LoaderSkeleton />
      ) : (
        <div className="pb-12">
          <div className="listing-title">
            <h2>My Listings</h2>
            <div className="title-border"></div>
          </div>
          <div className="item-container">{renderLostItems()}</div>
        </div>
      )}
    </div>
  );
}
