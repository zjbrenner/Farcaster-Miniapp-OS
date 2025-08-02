import React from "react";

// Allow callers to pass additional properties such as click handlers or
// custom classes. Default to a non-submitting button to avoid accidental
// form submissions.
export const Button = ({
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
