import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/item_card.css";
import "../css/mylisting.css";
import Axios from "axios";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";

export default function Feed() {

  const [item, setitem] = useState("");
  useEffect(() => {
    Axios({
      url: `http://localhost:5000/api/mylistings/${JSON.parse(localStorage.getItem("user"))._id}`,
      method: "GET",
    })
      .then((response) => {
        let data = response.data.item;
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="listing-title">
        <h2>My Listings</h2>
        <div className="title-border"></div>
      </div>
      <div>
      </div>
    </div>
  );
}
