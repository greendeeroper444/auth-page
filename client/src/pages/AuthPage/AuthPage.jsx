import React, { useState } from 'react'
import styles from './AuthPage.module.css';
import useAuth from '../../hooks/useAuth';
import { LoginForm, SignupForm } from '../../components/auth';
import { Button } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, loading, user, logout } = useAuth();
  const { showSuccess, showError, showLoading } = useToast();

  const handleLogout = async () => {
    //show loading toast
    const loadingToastId = showLoading("Signing you out...", { 
      duration: 10000 
    });

    try {
      await logout();
      
      showSuccess("Logged out successfully!", {
        duration: 3000
      });
    } catch (error) {
      showError("Failed to logout. Please try again.", {
        duration: 5000
      });
      console.error('Logout failed:', error);
    }
  };

  const handleLogin = async (credentials) => {
    //show loading toast
    const loadingToastId = showLoading("Signing you in...", { 
      duration: 10000 
    });

    const result = await login(credentials);
    
    if (result.success) {
      showSuccess("Login successful! Welcome back!", {
        duration: 4000
      });
      console.log('Login successful:', result.user);
    } else {
      showError(result.error || "Login failed. Please try again.", {
        duration: 5000
      });
      console.error('Login failed:', result.error);
    }
  };

  const handleSignup = async (userData) => {
    //show loading toast
    const loadingToastId = showLoading("Creating your account...", { 
      duration: 10000
    });

    const result = await signup(userData);
    
    if (result.success) {
      showSuccess("Account created successfully! Welcome!", {
        duration: 4000
      });
      console.log('Signup successful:', result.user);
    } else {
      showError(result.error || "Signup failed. Please try again.", {
        duration: 5000
      });
      console.error('Signup failed:', result.error);
    }
  };

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.welcomeContent}>
            <h2 className={styles.welcomeTitle}>Welcome!</h2>
            <p className={styles.welcomeText}>
              You are successfully logged in as {user.name}
            </p>
            <Button 
              variant="secondary" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.authContainer}`}>
      <div className={`${styles.card} ${styles.authCard}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className={styles.subtitle}>
            {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
          </p>
        </div>

        {
          isLogin ? (
            <LoginForm onSubmit={handleLogin} loading={loading} />
          ) : (
            <SignupForm onSubmit={handleSignup} loading={loading} />
          )
        }

        <div className={styles.switch}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            className={styles.switchLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AuthPage