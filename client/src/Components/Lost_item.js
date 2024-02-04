import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
function LostItem() {
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
      <Button variant="primary" onClick={handleShow}>
        Post Item
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                Item name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setItemname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Description<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter a question based on the item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex:- What is the color of the phone ?"
                value={itemquestion}
                onChange={(e) => setItemquestion(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Item type<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="select"
                required={true}
                defaultValue="Choose..."
                onChange={(e) => setType(e.target.value)}
              >
                <option>Choose..</option>
                <option value={"Lost"}>Lost It</option>
                <option value={"Found"}>Found It</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.File
                type="file"
                id="formimage"
                label="Upload Image"
                onChange={(e) => {
                  let { files } = e.target;
                  // Convert FileList to an array and update state
                  const imageArray = Array.from(files);
                  setItemimage(imageArray);
                }}
                multiple
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePostItem}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LostItem;
