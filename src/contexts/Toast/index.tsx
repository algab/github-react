import React, { useCallback, useState, createContext } from 'react';
import { Snackbar } from '@material-ui/core';

const ToastContext = createContext({});

interface Props {
  children: React.ReactChild;
};

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const setToast = useCallback((state) => {
    setShowToast(state);
  }, []);

  return (
    <ToastContext.Provider value={{ handleToast: setToast, setMessage: setMessageToast }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showToast}
        autoHideDuration={2000}
        onClose={() => setShowToast(false)}
        message={messageToast}
      />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
