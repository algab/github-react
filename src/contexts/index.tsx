import React from 'react';

import { ToastProvider } from './Toast';

interface Props {
  children: React.ReactChild;
}

const Context: React.FC<Props> = ({ children }) => (
  <ToastProvider>
    {children}
  </ToastProvider>
);

export default Context;
