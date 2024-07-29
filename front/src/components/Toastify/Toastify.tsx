import React from "react";
import { Slide, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Alert() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="dark"
      transition={Slide}
    />
  );
}

export default Alert;
