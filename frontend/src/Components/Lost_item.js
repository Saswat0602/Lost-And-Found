import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { ProjectCotext } from "../Context/ProjectCotext";
import Addproperty from "./PostItem";

function LostItem() {
  const { showPostModal, setShowPostModal } = ProjectCotext();

  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [itemname, setItemname] = useState("");
  const [description, setDescription] = useState("");
  const [itemquestion, setItemquestion] = useState("");
  const [itemimage, setItemimage] = useState([]);
  const [type, setType] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handlePostItem = () => {
    setLoading(true);

    if (itemname && description && type && itemimage.length > 0) {
      const formData = new FormData();
      formData.append("name", itemname);
      formData.append("description", description);
      formData.append("question", itemquestion);
      formData.append("type", type);
      itemimage.forEach((image) => {
        formData.append("itemPictures", image);
      });

      axios({
        url: "http://localhost:5000/api/postitem",
        method: "POST",
        data: formData,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              ) +
              "%"
          );
        },
      })
        .then((response) => {
          console.log(response);
          // Reset form fields and close the modal
          setItemname("");
          setDescription("");
          setType("");
          setItemquestion("");
          setItemimage([]);
          setLoading(false);
          setShow(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
      console.log("Please fill in all required fields and upload at least one image.");
    }
  };

  const temporaryShut = () => {
    setShow(false);
  };

  return (
    <div>



    </div>
  );
}

export default LostItem;
