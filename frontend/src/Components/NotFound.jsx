import React from "react";
import { useNavigate } from "react-router-dom";
import not from "../assets/not.png";

const NotFound = () => {
  const navigate = useNavigate();

  const navi = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#E9FCFF] min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <img className="rounded-2xl w-[800px]" src={not} alt="404_Image " />
        <h1 className="font-black text-4xl text-opacity-60 text-purple-500">
          Page Not Found
        </h1>
        <button
          className="bg-purple-500 px-6 border rounded-lg py-3 text-lg text-white font-medium mt-5"
          onClick={navi}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
