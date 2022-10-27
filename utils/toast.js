import { toast } from 'react-toastify';

const ToastMessage = {
  success: (message, options) =>
    toast.success(message, {
      hideProgressBar: true,
      autoClose: 100,
      ...options,
    }),
};

export default ToastMessage;
