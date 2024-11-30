import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return <input type={props.type} className={className} {...props} />;
};
export default Input;
