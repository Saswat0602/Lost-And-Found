import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const ShowContactinfoModal = ({ isOpen, contactNumber, onCancel }) => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Contact number copied to clipboard!");
      onCancel();
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy contact number to clipboard.");
      onCancel();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      style={{
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
          width: "350px",
          height: "170px",
        },
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        },
      }}
    >
      <div>
        <h6 className="text-center">Contact to this number :{contactNumber}</h6>
        <div className="flex justify-around mt-4">
          <button
            onClick={onCancel}
            className="py-2 px-2 rounded-md bg-red-300 hover:bg-slate-300"
          >
            cansel
          </button>
          <button
            className="bg-blue-300 py-2 px-2 rounded-md hover:bg-slate-300"
            onClick={() => copyToClipboard(contactNumber)}
          >
            Okey
          </button>
        </div>
        <p className="text-center">Click ok to copy the Phone number</p>
      </div>
    </Modal>
  );
};
export default ShowContactinfoModal;
