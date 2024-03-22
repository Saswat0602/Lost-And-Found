import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectCotext } from "../Context/ProjectCotext";
import "../css/landing.css";


const AddItem = () => {
  const [image, setImage] = useState(null);
  const { showPostModal, setShowPostModal } = ProjectCotext();

  const [input, setInput] = useState({
    name: "",
    description: "",
    question: "",
    type: "",
  });
  const [token, setToken] = useState(""); 
  const port = 5000;
  useEffect(() => {
    getAuthdata();
  }, [showPostModal]);

  const getAuthdata = async () => {
    const data = localStorage.getItem("token");
    if (!data) {
      toast.warn("Please login ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/log-in");
    } else {
      setToken(data); 
    }
  };

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

  const handleAddItem = async (e) => {
    console.log("token",token)
    // e.preventDefault();
    const { name, description, location ,type,question } = input;
    if (!name || !description || !location ||!question || !type) {
      toast.warn("All fields are required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!token) {
      toast.error("You need to be authenticated to add a new property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("question", question);
      formData.append("type", type);

      const response = await fetch(`http://localhost:${port}/api/postitem`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("data", data);
      if (response.status >= 400 || !data) {
        toast.error("Some error occurred while adding the Item", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success("Item Poasted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred while adding the Item", {
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

  return (
    <div className="bg-slate-50  p-3 border rounded-xl shadow-xl max-w-xl mt-4 mx-auto sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      <h2 className="text-3xl  text-blue-700 font-bold text-center">
        Post A Item
      </h2>
      <form className="flex flex-col gap-2 mt-4" encType="multipart/form-data">
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
          Item Type
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="type"
          placeholder="Enter your type of the Item "
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
          placeholder="Enter the Where You find this Item "
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
        <div className="flex justify-around gap-3 mt-4">
          <div className="flex justify-center items-center">
            <button
              onClick={handleCancel}
              className="py-2 px-4 bg-red-400 border rounded-lg text-sm hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleAddItem()}
              className="py-2 px-4 bg-sky-300 border rounded-lg text-sm hover:bg-slate-400"
            >
              Add Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
