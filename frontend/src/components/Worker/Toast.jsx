import React from 'react';
import { useToasts } from 'react-toast-notifications';

const Toast = ({ message, appearance }) => {
  const { addToast } = useToasts();

  React.useEffect(() => {
    if (message) {
      addToast(message, { appearance });
    }
  }, [message, appearance, addToast]);

  return null;
};

export default Toast;