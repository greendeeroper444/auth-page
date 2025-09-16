import React from 'react'

const validation = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  password: (password) => {
    return password.length >= 8;
  },
  
  name: (name) => {
    return name.trim().length >= 2;
  },
  
  getPasswordStrength: (password) => {
    let strength = 0;
    const checks = [
      /.{8,}/, //at least 8 characters
      /[a-z]/, //lowercase letter
      /[A-Z]/, //uppercase letter
      /\d/, //number
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ //special character
    ];
    
    checks.forEach(check => {
      if (check.test(password)) strength++;
    });
    
    if (strength <= 2) return { level: 'weak', color: '#ff4757', text: 'Weak' };
    if (strength <= 3) return { level: 'medium', color: '#ffa502', text: 'Medium' };
    return { level: 'strong', color: '#2ed573', text: 'Strong' };
  }
}

export default validation