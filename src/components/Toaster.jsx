import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toaster({ type, message }) {
  const notify = () => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  React.useEffect(() => {
    notify();
  }, [type, message]);

  return <ToastContainer />;
}

export default Toaster;
