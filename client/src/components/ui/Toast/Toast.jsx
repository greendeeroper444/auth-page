import React, { useEffect, useState } from 'react'
import styles from './Toast.module.css'

const Toast = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose,
  showLoading = false,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    //show toast with entrance animation
    const showTimer = setTimeout(() => setIsVisible(true), 50);
    
    //auto-hide toast after duration
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'error':
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case 'info':
        return (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const LoadingSpinner = () => (
    <div className={styles.spinner}>
      <div className={styles.spinnerRing}></div>
    </div>
  );

  if (!isVisible && !isLeaving) return null;

  return (
    <div 
      className={`
        ${styles.toast} 
        ${styles[type]} 
        ${styles[position]}
        ${isVisible && !isLeaving ? styles.show : ''}
        ${isLeaving ? styles.hide : ''}
      `}
    >
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          {showLoading ? <LoadingSpinner /> : getIcon()}
        </div>
        
        <div className={styles.message}>
          {message}
        </div>
        
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close notification"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      
      <div className={`${styles.progressBar} ${styles[type]}`}></div>
    </div>
  )
}

export default Toast