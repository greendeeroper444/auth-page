import React, { useState } from 'react'
import { useForm } from '../../../hooks';
import { validation } from '../../../utils';
import { Button, Input } from '../../ui';

const LoginForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    {
      email: validation.email,
      password: validation.password
    }
  );

  return (
    <div>
      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        placeholder="Enter your email"
        leftIcon="email"
      />
      
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={errors.password}
        placeholder="Enter your password"
        leftIcon="lock"
        rightIcon={showPassword ? "eye-slash" : "eye"}
        onRightIconClick={() => setShowPassword((prev) => !prev)}
      />
      
      <Button
        loading={loading} 
        onClick={handleSubmit(onSubmit)}
      >
        Sign In
      </Button>
    </div>
  )
}

export default LoginForm