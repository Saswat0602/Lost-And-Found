import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/myresponses.css";
import Axios from "axios";
import ShowContactinfoModal from "../widgets/ShowContactinfoModal";
import Spinner from "../widgets/Spinner";
function Response() {
  const [response, setResponse] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const token = localStorage.getItem("token");
  const [Loading, setLoading] = useState(true);
  const [contactNumber, setContactNumber] = useState(null);
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
  const handleShowNumber = (number) => {
    setContactNumber(number);
    setShowNumber(true);
  };
  console.log(response,"response")
  const renderResponse = () => {
    return response.map((item, index) => (
      <div
        key={index}
        className="w-[400px] bg-slate-100 min-h-[200px] rounded-md p-2 border border-black shadow-md "
      >
        <p>
          Item Name :<span>{item.itemName ?? item?._id}</span>
        </p>
        <p>
          Questions : <span>{item.question}</span>
        </p>
        <p>
          Your Answer : <span>{item?.answer}</span>
        </p>
        <p>
          Submitted At : <span>{formatDate(item?.createdAt)}</span>
        </p>
        <p>
          Status:{" "}
          <span
            className={`${
              item.confirmation ? "bg-green-400" : "bg-blue-400"
            } px-2 rounded-3xl py-1`}
          >
            {item.confirmation ? "Got A Response" : "Moderation"}
          </span>
        </p>
        <div>
        <div>
        {item.confirmation && (
          <>
            {item.responseBack === "yes" ? (
              <button
                className="text-blue-500"
                onClick={() => handleShowNumber(item?.contactInfo)}
              >
                Click to get Contact Num...
              </button>
            ) : (
              <p>Sorry, it's not the Item.</p>
            )}
          </>
        )}
      </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      {Loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
      {response.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-center">You have Post no response yet.</h1>
        </div>
      )}
      <div>
        <h2 className="text-center underline">Your Response</h2>
        <div className="flex flex-wrap justify-start px-4 gap-4 mt-4">
          {renderResponse()}
        </div>
        <ShowContactinfoModal
          isOpen={showNumber}
          contactNumber={contactNumber}
          onCancel={handleCloseNumber}
        />
      </div>
    </>
  );
}

export default Response;
