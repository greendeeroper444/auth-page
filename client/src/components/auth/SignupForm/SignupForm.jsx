import React, { useState } from 'react'
import { useForm } from '../../../hooks';
import { validation } from '../../../utils';
import { Button, Input } from '../../ui';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

const SignupForm = ({ onSubmit, loading }) => {
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    {
      name: validation.name,
      email: validation.email,
      password: validation.password,
      confirmPassword: (value) => value === values.password || "Passwords don't match",
    }
  );

  return (
    <div>
      <Input
        label="Full Name"
        type="text"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        placeholder="Enter your full name"
        leftIcon="user"
      />

      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        placeholder="Enter your email"
        leftIcon="email"
      />

      <div>
        <Input
          label="Password"
          type={showPasswords.password ? "text" : "password"}
          value={values.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          placeholder="Create a password"
          leftIcon="lock"
          rightIcon={showPasswords.password ? "eye-slash" : "eye"}
          onRightIconClick={() => togglePasswordVisibility('password')}
        />
        <PasswordStrength password={values.password} />
      </div>

      <Input
        label="Confirm Password"
        type={showPasswords.confirmPassword ? "text" : "password"}
        value={values.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        leftIcon="lock"
        rightIcon={showPasswords.confirmPassword ? "eye-slash" : "eye"}
        onRightIconClick={() => togglePasswordVisibility('confirmPassword')}
      />

      <Button
        loading={loading}
        onClick={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
    </div>
  )
}

export default SignupForm
