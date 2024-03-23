import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/myresponses.css";
import Axios from "axios";

function Response() {
  const [response, setResponse] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const token = localStorage.getItem("token");
  const [Loading, setLoading] = useState(true);

  const handleCloseNumber = () => {
    setShowNumber(false);
  };

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
          "http://localhost:5000/api/getuserresponse",
          config
        );
        setResponse(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user's items:", error);
      }
    };
    fetchUserItems();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("in", options);

    return formattedDate;
  }

  const renderResponse = () => {
    return response.map((item, index) => (
      <div className="w-[400px] bg-slate-100 min-h-[200px] rounded-md p-2 border border-black shadow-md">
        <p>
          Item Name :<span>{response[0]?.itemName ?? response[0]?._id}</span>
        </p>
        <p>
          Questions : <span>{response[0]?.question}</span>
        </p>
        <p>
          Your Answer : <span>{response[0]?.answer}</span>
        </p>
        <p>
          Submitted At : <span>{formatDate(response[0]?.createdAt)}</span>
        </p>
        <p>
          Status:{" "}
          <span
            className={`bg-${
              response[0]?.confirmation ? "green" : "blue"
            }-400 px-2 rounded-3xl py-1`}
          >
            {response[0]?.confirmation ? "Response" : "Moderation"}
          </span>
        </p>
        {response[0]?.confirmation && (
          <button className="text-blue-500">Click to get Contact Num...</button>
        )}
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center underline">Your Response</h2>
        <div className="flex flex-wrap justify-start px-4  mt-4">
          {renderResponse()}
        </div>
      </div>
    </>
  );
}

export default Response;
