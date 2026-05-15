import React, { useEffect } from 'react';

const Notification = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded shadow-lg text-white transition-all duration-300 ${
      type === 'error' ? 'bg-red-500' : 'bg-green-500'
    }`}>
      <span>{message}</span>
      <button
        className="ml-4 text-white font-bold"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
