import React from "react";
import Modal from "react-modal";
import "../css/mylisting.css";

Modal.setAppElement("#root"); 
const ConfirmationModal = ({ isOpen, message, onCancel, onConfirm }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onCancel}
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            width: '250px',
          height: '150px',
          },
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          },
        }}
      >
        <div>
          <h6 className="text-center">{message}</h6>
          <div className="flex justify-around mt-4">
            <button onClick={onCancel} className="py-2 px-2 rounded-md bg-blue-300 hover:bg-slate-300">Cancel</button>
            <button onClick={onConfirm} className="bg-red-300 py-2 px-2 rounded-md hover:bg-slate-300">Confirm</button>
          </div>
        </div>
      </Modal>
    );
  };
   export default ConfirmationModal