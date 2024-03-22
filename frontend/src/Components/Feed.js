import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/feed.css";
import Axios from "axios";
import lostfound from "../assets/bgimage.jpg";

export default function Feed() {
  const [user_info, setuser_info] = useState({
    name: JSON.parse(localStorage.getItem("name")) || "",
    id: JSON.parse(localStorage.getItem("user")) || "",
  });

  const [lostItems, setLostItems] = useState([]);

  console.log(lostItems, "lostItems");

  setConstraint(true);

  useEffect(() => {
    Axios({
      url: "http://localhost:5000/api/getAllItems",
      method: "GET",
    })
      .then((response) => {
        let data = response.data;
        console.log(data, "data");
        setLostItems(data); // Set the lost items from API response
      })
      .catch((err) => {
        console.log("Error :", err);
      });
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
      <div>
        <Navbar />
        <h2
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            marginLeft: "5px",
          }}
        >
          Welcome Back {user_info.name ?? " "} 👋!
        </h2>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>Lost items :</h2>
        <div className="title-border"></div>
        <div className="item-container">{renderLostItems()}</div>
      </div>
      <div className=" h-40 max-h-screen">
        <h2 style={{ textAlign: "center" }}>Found items :</h2>
        <div className="title-border"></div>
        <div className="flex justify-center font-serif mt-10">
          No Found Items Till Now{" "}
        </div>
      </div>
    </div>
  );
}
