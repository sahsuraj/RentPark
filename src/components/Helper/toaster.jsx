import React from "react";
import { withToastManager } from "react-toast-notifications";
const ToastDemo = (toastManager, error_message, type) => {
  return toastManager.add(error_message, {
    appearance: type,
    autoDismiss: true,
    pauseOnHover: false
  });
};

export default ToastDemo;
