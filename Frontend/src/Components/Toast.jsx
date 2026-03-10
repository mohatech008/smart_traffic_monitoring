import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const Toast = ({ id, message, type = "success", removeToast }) => {

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 4000);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  const styles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400",
  };

  const icons = {
    success: <FaCheckCircle className="text-emerald-500" />,
    error: <FaExclamationCircle className="text-red-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg transition-all animate-slide-in-right ${styles[type]}`}>
      <div className="text-lg">{icons[type]}</div>
      <p className="text-sm font-medium pr-4">{message}</p>
      <button 
        onClick={() => removeToast(id)}
        className="ml-auto hover:opacity-70 transition-opacity"
      >
        <FaTimes size={14} />
      </button>
    </div>
  );
};

export default Toast;