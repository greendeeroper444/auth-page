import { validation } from '../../../utils';
import styles from './PasswordStrength.module.css';

const PasswordStrength = ({ password }) => {
  const strength = validation.getPasswordStrength(password);

  if (!password) return null;

  const getFillClass = () => {
    switch (strength.level) {
      case 'weak':
        return `${styles.fill} ${styles.fillWeak}`;
      case 'medium':
        return `${styles.fill} ${styles.fillMedium}`;
      default:
        return `${styles.fill} ${styles.fillStrong}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div 
          className={getFillClass()}
          style={{ backgroundColor: strength.color }}
        ></div>
      </div>
      <div 
        className={styles.text}
        style={{ color: strength.color }}
      >
        Password strength: {strength.text}
      </div>
    </div>
  )
}

export default PasswordStrength