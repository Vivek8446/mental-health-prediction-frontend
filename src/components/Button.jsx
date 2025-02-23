import React from 'react';

const Button = ({ onClick, type, disabled, isPrimary, children }) => {
  const baseClasses = "px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryClasses = isPrimary 
    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500" 
    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${primaryClasses} ${disabledClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;