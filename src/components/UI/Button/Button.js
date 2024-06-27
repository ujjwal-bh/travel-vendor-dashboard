import React from "react";

const Button = ({
  size = "medium",
  type = "filled",
  color = "primary",
  icon,
  children,
  onClick = null,
  disabled=false
}) => {
  return (
    <button className={`button ${size} ${type} ${color} h6 ${disabled && "disabled"}`} onClick={onClick} disabled={disabled}>
      {icon} {children}
    </button>
  );
};

export default Button;
