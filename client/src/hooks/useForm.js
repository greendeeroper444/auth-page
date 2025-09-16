import React, { useState } from 'react'

const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name, value) => {
    if (validationRules[name]) {
      const isValid = validationRules[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: isValid ? '' : getErrorMessage(name)
      }));
      return isValid;
    }
    return true;
  };

  const getErrorMessage = (name) => {
    switch (name) {
      case 'email': return 'Please enter a valid email address';
      case 'password': return 'Password must be at least 8 characters long';
      case 'name': return 'Name must be at least 2 characters long';
      case 'confirmPassword': return 'Passwords do not match';
      default: return 'This field is required';
    }
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (callback) => {
    return (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      let isFormValid = true;
      Object.keys(validationRules).forEach(name => {
        if (!validate(name, values[name])) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        callback(values);
      }
      setIsSubmitting(false);
    }
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}

export default useForm