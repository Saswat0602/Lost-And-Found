import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectCotext } from "../Context/ProjectCotext";
import "../css/landing.css";


const Addproperty = () => {
  const [image, setImage] = useState(null);
  const { showPostModal, setShowPostModal } = ProjectCotext();

  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    type: "",
    amenities: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShowPostModal(false);
  };

  return (
    <div className="bg-slate-50  p-3 border rounded-xl shadow-xl max-w-xl mt-4 mx-auto sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      <h2 className="text-3xl  text-blue-700 font-bold text-center">
        Add New Item
      </h2>
      <form className="flex flex-col gap-3 mt-5" encType="multipart/form-data">
        <label htmlFor="name" className="ml-2">
          Name
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="name"
          placeholder="Enter your name of the Item "
          onChange={handleChange}
        />
        <label htmlFor="type" className="ml-2">
          Proerty Type
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="type"
          placeholder="Enter your name of the Item "
          onChange={handleChange}
        />
        <label htmlFor="picture" className="ml-2 ">
          Upload Picture
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          multiple
          onChange={(e) => {
            const selectedFiles = e.target.files;
            const maxFiles = 3;                                             
            if (selectedFiles.length > maxFiles) {
              alert("You can only upload a maximum of 3 pictures . Select Again");
              e.target.value = "";
              return;
            }
            if (selectedFiles && selectedFiles.length > 0) {
              setImage(selectedFiles); 
            }
          }}
        />

        <label htmlFor="location" className="ml-2">
          Location
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="location"
          placeholder="Enter the location of this Item "
          onChange={handleChange}
        />

        <label htmlFor="price" className="ml-2">
          Price
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="price"
          placeholder="Add price"
          onChange={handleChange}
        />
        <label htmlFor="amenities" className="ml-2">
          Add Amenities
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="amenities"
          placeholder="Enter your name of the Item "
          onChange={handleChange}
        />
        <label htmlFor="description" className="ml-2">
          Description
        </label>
        <textarea
          className="p-1 border rounded-lg"
          name="description"
          placeholder="Describe something about this Item "
          cols={40}
          rows={3}
          onChange={handleChange}
        />
        <button className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600">
          Add Item
        </button>
        <div className="flex justify-around gap-3 mt-4">
          <div className="flex justify-center items-center">
            <button
              onClick={handleCancel}
              className="py-2 px-4 bg-red-500 border rounded-lg text-sm hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              // onClick={() => navigate("/")}
              className="py-2 px-4 bg-blue-300 border rounded-lg text-sm hover:bg-slate-400"
            >
              Home
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addproperty;
