import React, { useState, useCallback } from 'react';
import Toast from './Toast';
import { ToastContext } from '../../../contexts/ToastContext';

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type: options.type || 'success',
      duration: options.duration || 3000,
      showLoading: options.showLoading || false,
      position: options.position || 'top-right'
    };

    setToasts(prev => [...prev, toast]);

    //auto remove toast after duration + animation time
    setTimeout(() => {
      removeToast(id);
    }, toast.duration + 500);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, options) => {
    return addToast(message, { ...options, type: 'success' });
  }, [addToast]);

  const showError = useCallback((message, options) => {
    return addToast(message, { ...options, type: 'error' });
  }, [addToast]);

  const showWarning = useCallback((message, options) => {
    return addToast(message, { ...options, type: 'warning' });
  }, [addToast]);

  const showInfo = useCallback((message, options) => {
    return addToast(message, { ...options, type: 'info' });
  }, [addToast]);

  const showLoading = useCallback((message, options) => {
    return addToast(message, { 
      ...options, 
      showLoading: true,
      duration: options?.duration || 5000
    });
  }, [addToast]);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    clearAll,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div>
        {
          toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              showLoading={toast.showLoading}
              position={toast.position}
              onClose={() => removeToast(toast.id)}
            />
          ))
        }
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider