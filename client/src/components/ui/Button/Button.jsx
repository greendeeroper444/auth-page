import styles from './Button.module.css'

const Button = ({ children, variant = 'primary', disabled = false, loading = false, onClick, ...props }) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    loading && styles.loading
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled || loading} 
      onClick={handleClick} 
      {...props}
    >
      {
        loading ? (
          <span className={styles.loadingContent}>
            <span className={styles.spinner}></span>
            Loading...
          </span>
        ) : children
      }
    </button>
  )
}

export default Button