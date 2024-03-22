import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Update from "./Update";
import { toast } from "react-toastify";


const ItemDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

const id = localStorage.getItem("userId")

  const navigate = useNavigate();
  console.log("Property ID:", propertyId);

  useEffect(() => {
    console.log("Fetching property details...");
    fetch(`http://localhost:7000/property/${propertyId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched property data:", data);
        setProperty(data);
      })
      .catch((error) => console.error("Error fetching property:", error));
  }, [propertyId]);

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
        `http://localhost:7000/property/delete/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
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

        navigate("/property");
      } 
      
      
      else if (response.status === 404) {
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

  if (!property) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <div className="p-2">
    <h1 className="ml-6 font-light text-2xl text-green-600 items-center">
      {property.name.toUpperCase()}
    </h1>
    <div className="flex flex-col md:flex-row m-5">
      <div className="w-full md:w-1/2 pr-6 mb-4 md:mb-0">
        <img
          src={property.picture[0].url}
          alt={property.name}
          className="w-full border rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2">
      <h1>
          <span className="font-bold text-blue-300">Property Type : </span>
          {property.type}
        </h1>
        <h1></h1>
        <h1>
          <span className="font-bold text-blue-300">Price : </span>₹
          {property.price}
        </h1>
        <h1>
          <span className="font-bold text-blue-300">Location : </span>
          {property.location}
        </h1>
        <h1>
        <span className="font-bold text-blue-300">Amenities  : </span>
        {property.amenities}
      </h1>
        <div className="mt-4">
          <h1 className="font-bold text-blue-300">About This Property : </h1>
          <p>Description: {property.description}</p>
        </div>

        {id === property.author && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleEditProperty}
              className="bg-blue-500 p-2 md:p-4 border rounded-md mx-2"
            >
              Edit Property
            </button>
            <button
              onClick={handleDeleteItem}
              className="bg-red-500 p-2 md:p-4 border rounded-md mx-2"
            >
              Delete Property
            </button>
          </div>
        )}
      </div>
    </div>
    <button
      onClick={() => navigate("/property")}
      className="bg-blue-300 p-2 md:p-4 border rounded-md ml-5 mb-3 block"
    >
      Back to Property List
    </button>
    {showUpdate && (
      <Update
        propertyId={propertyId}
        closeUpdate={() => setShowUpdate(false)}
      />
    )}
  </div>
  
    </>
  );
};

export default ItemDetails;
