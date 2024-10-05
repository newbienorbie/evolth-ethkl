import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./BackButton.styles.css";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.pathname.includes("/franchise/store")) {
      navigate("/franchise");
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className='back-button'
    >
      <IoMdArrowRoundBack /> Back
    </button>
  );
};

export default BackButton;
