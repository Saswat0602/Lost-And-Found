import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Update from "./Update";
import { toast } from "react-toastify";
import lostfound from "../assets/bgimage.jpg";
import ConfirmationModal from "../widgets/ConfirmationModal";
import { ProjectCotext } from "../Context/ProjectCotext";
import ResponseModal from "../widgets/ResponseModal";
const ItemDetails = () => {
  const { itemID } = useParams();
  console.log(itemID, "itemID");
  const [property, setProperty] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { showResponseModal, setResponseModal } = ProjectCotext();

  const [message, setMessage] = useState("")
  const id = localStorage.getItem("user"); 
  const navigate = useNavigate();
  console.log("Property ID:", itemID);

  useEffect(() => {
    console.log("Fetching property details...");
    fetch(`http://localhost:5000/api/getItemById/${itemID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched property data:", data);
        setProperty(data);
      })
      .catch((error) => console.error("Error fetching property:", error));
  }, [itemID]);

  const handleEditProperty = () => {
    setShowUpdate(true);
  };

  const handleDeleteItem = async () => {
    try {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        console.error("Access token not found ");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/deleteItem/${itemID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Property deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/mylistings");
      } else if (response.status === 404) {
        toast.error("Property not found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("An error occurred while deleting the property:", error);
      toast.error("An error occurred while deleting the property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleDeleteItemAlert = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirmationConfirm = () => {
    setIsConfirmationOpen(false);
    handleDeleteItem();
  };

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

  if (!property) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="p-2">
        <h1 className="ml-12 font-light text-2xl text-green-600 items-center">
          {property?.name?.toUpperCase()}
        </h1>
        <div className="flex flex-col md:flex-row m-5">
          <div className="w-full md:w-1/2 pr-6 mb-4 md:mb-0">
            <img
              // src={property.thumbnailUrl[0] ?? lostfound}
              src={lostfound}
              alt={property.name}
              className="w-full border rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2>
              <span className="font-mono text-blue-300">Item Name:</span>
              <span className="text-2xl">{property.type}</span>
            </h2>
            <h2>
              <span className="font-mono text-blue-300">About This Item:</span>
              <span className="text-2xl">{property.description}</span>
            </h2>

            <h2>
              <span className="font-mono text-blue-300">Created At:</span>
              <span className="text-2xl">
                {formatDate(property?.createdAt)}
              </span>
            </h2>

            {JSON.parse(id) === property.author ? (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleEditProperty}
                  className="bg-blue-500 p-2 md:p-4 border rounded-md mx-2"
                >
                  Edit Property
                </button>
                <button
                  onClick={handleDeleteItemAlert}
                  className="bg-red-500 p-2 md:p-4 border rounded-md mx-2"
                >
                  Delete Property
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="bg-blue-500 px-2  py-2 rounded-md hover:bg-slate-400 transition ease-in-out duration-0.3"
                  onClick={() => {
                    setResponseModal(!showResponseModal);
                  }}
                >
                  Found Item
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate("/mylistings")}
          className="bg-blue-300 p-2 md:p-4 border rounded-md  mb-3 block ml-12"
        >
          Back to Listing item List
        </button>
        {/* {showUpdate && (
      <Update
        itemID={itemID}
        closeUpdate={() => setShowUpdate(false)}
      />
    )} */}
        <ResponseModal  Question ={property?.question}/>
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          message="Are you sure you want to delete this item?"
          onCancel={handleConfirmationCancel}
          onConfirm={handleConfirmationConfirm}
        />
      </div>
    </>
  );
};

export default ItemDetails;
