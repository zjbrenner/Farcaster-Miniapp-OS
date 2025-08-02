import React from "react";

export const Button = ({ children }) => {
  return (
    <button className="inline-flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
      {children}
    </button>
  );
};
