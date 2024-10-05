import React from "react";
import "./Button.styles.css";

const Button = ({ className, onClick, children, ...props }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
