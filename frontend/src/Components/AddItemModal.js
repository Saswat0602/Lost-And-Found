import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "../css/feed.css"; 
import axios from "axios";
import { ProjectCotext } from "../Context/ProjectCotext";

Modal.setAppElement("#root");

function AddItemModal() {
  const { showPostModal, setShowPostModal } = ProjectCotext();
  const [image, setImage] = useState(null);

  const closeModal = () => {
    setShowPostModal(false);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("rtyuio");
  const [type, setType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };


  // const [token, setToken] = useState("");
  useEffect(() => {
    // getAuthdata();
  }, []);
  const token = localStorage.getItem("token");
  // const getAuthdata = async () => {
  //   const data = localStorage.getItem("token");
  //   if (!data) {
  //     toast.warn("Please login ", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //     navigate("/log-in");
  //   } else {
  //     setToken(data);
  //   }
  // };

  const navigate = useNavigate();

  const handleCancel = () => {
    setShowPostModal(false);
  };

  
  const handleAddItem = async (e) => {
    e.preventDefault();
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
      const postData = {
        name: name,
        description: description,
        question: question,
        type: type,
        imgUris: [
          "https://example.com/image7555.jpg",
          "https://example.com/image3452.jpg",
        ],
        thumbnailUrls: [
          "https://example.com/thumbnail909090.jpg",
          "https://example.com/thumbnail898092.jpg",
        ],
      };
      const response = await axios.post(
        "http://localhost:5000/api/postitem",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 400 || !response.data) {
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
        toast.success("Item Posted successfully", {
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
    <div>
      <Modal
        isOpen={showPostModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="bg-slate-50  p-3 border rounded-xl shadow-xl max-w-xl mt-4 mx-auto ">
          <h2 className="text-3xl  text-blue-700 font-bold text-center">
            Post A Item
          </h2>
          <form
            className="flex flex-col gap-2 mt-4"
            encType="multipart/form-data"
          >
            <label htmlFor="name" className="ml-2">
              Name
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="name"
              placeholder="Enter your name of the Item "
              onChange={handleNameChange}
            />
            <label htmlFor="type" className="ml-2">
              Item Type
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="type"
              placeholder="Enter your type of the Item "
              onChange={handleTypeChange}
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
                  alert(
                    "You can only upload a maximum of 3 pictures . Select Again"
                  );
                  e.target.value = "";
                  return;
                }
                if (selectedFiles && selectedFiles.length > 0) {
                  setImage(selectedFiles);
                }
              }}
            />

            <label htmlFor="location" className="ml-2">
              Questions
            </label>
            <input
              type="text"
              className="p-1 border rounded-lg"
              name="location"
              placeholder="Enter the Question "
              onChange={handleQuestionChange}
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
              onChange={handleDescriptionChange}
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
                  onClick={(e) => handleAddItem(e)}
                  className="py-2 px-4 bg-sky-300 border rounded-lg text-sm hover:bg-slate-400"
                >
                  Add Item
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default AddItemModal;
