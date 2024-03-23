import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "./Navbar";
import "../css/feed.css";
import Axios from "axios";
import lostfound from "../assets/bgimage.jpg";
import LoaderSkeleton from "../Components/LoaderSkeleton";
import { Link } from "react-router-dom";
export default function Feed() {
  const [user_info, setuser_info] = useState({
    name: JSON.parse(localStorage.getItem("name")) || "",
    id: JSON.parse(localStorage.getItem("user")) || "",
  });

  const [lostItems, setLostItems] = useState([]);
  const [Loading, setLoading] = useState(true);

  setConstraint(true);

  useEffect(() => {
    Axios({
      url: "http://localhost:5000/api/getAllItems",
      method: "GET",
    })
      .then((response) => {
        let data = response.data;
        setLostItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error :", err);
        setLoading(false);
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
      <Link
        to={`/feed/item/${item?._id}`}
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

      {Loading ? (
        <LoaderSkeleton />
      ) : (
        <div>
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
      )}
    </div>
  );
}
