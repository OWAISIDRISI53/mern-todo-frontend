/* eslint-disable react/prop-types */
function Toast({ type, message, onClose }) {
  const toastStyles = {
    success:
      "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
    error: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
    warning:
      "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
  };

  const iconClasses = {
    success: "fas fa-check-circle",
    error: "fas fa-times-circle",
    warning: "fas fa-exclamation-circle",
  };

  return (
    <div className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${toastStyles[type]}`}
      >
        <i className={`${iconClasses[type]} w-5 h-5`} aria-hidden="true"></i>
        <span className="sr-only">
          {type.charAt(0).toUpperCase() + type.slice(1)} icon
        </span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <i className="fas fa-times w-3 h-3" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default Toast;
