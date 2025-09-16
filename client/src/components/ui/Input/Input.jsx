import { useState } from 'react'
import styles from './Input.module.css'
import { User, EyeOff, Eye, Lock, Mail } from 'lucide-react'

const Input = ({ 
  label, 
  error, 
  onChange, 
  leftIcon, 
  rightIcon, 
  onRightIconClick,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);

  const inputClasses = [
    styles.input,
    focused && styles.focused,
    error && styles.error,
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon
  ].filter(Boolean).join(' ');

  const getIcon = (icon) => {
    switch (icon) {
      case 'user': return <User className={styles.icon} />;
      case 'email': return <Mail className={styles.icon} />;
      case 'lock': return <Lock className={styles.icon} />;
      case 'eye': return <Eye className={styles.icon} />;
      case 'eye-slash': return <EyeOff className={styles.icon} />;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {
          leftIcon && (
            <div className={styles.iconContainer}>
              {getIcon(leftIcon)}
            </div>
          )
        }

        <input 
          className={inputClasses}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {
          rightIcon && (
            <div 
              className={`${styles.iconContainer} ${styles.clickable}`} 
              onClick={onRightIconClick}
            >
              {getIcon(rightIcon)}
            </div>
          )
        }
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export default Input
