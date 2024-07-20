import React from 'react';

const Popup = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out scale-95 sm:scale-100 p-6 w-11/12 md:w-3/5 lg:w-2/5">
        <div className="text-gray-800 text-xl text-center font-medium">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
