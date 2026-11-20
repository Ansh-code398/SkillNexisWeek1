import React, { useState } from 'react';
import Button from '../Button/Button';
import './Form.css';

/**
 * Reusable Form Component
 * Schema-driven dynamic rendering of form fields with built-in validation, loading states, and accessible error handling.
 */
export const Form = ({
  title,
  subtitle,
  fields = [],
  onSubmit,
  submitText = 'Submit Form',
  resetText,
  initialValues = {},
  className = '',
  ...props
}) => {
  // Initialize state based on fields and initial values
  const [formData, setFormData] = useState(() => {
    const state = {};
    fields.forEach((field) => {
      state[field.name] = initialValues[field.name] !== undefined
        ? initialValues[field.name]
        : (field.type === 'checkbox' ? false : (field.defaultValue || ''));
    });
    return state;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Field change handler
  const handleChange = (e, field) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field.name]: value }));

    // Clear error on input
    if (errors[field.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field.name];
        return next;
      });
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate fields
    fields.forEach((field) => {
      const val = formData[field.name];
      if (field.required) {
        if (field.type === 'checkbox' && !val) {
          newErrors[field.name] = `${field.label || 'This checkbox'} is required.`;
        } else if (!val || String(val).trim() === '') {
          newErrors[field.name] = `${field.label || field.name} is required.`;
        }
      }

      if (field.type === 'email' && val && !/\S+@\S+\.\S+/.test(val)) {
        newErrors[field.name] = 'Please enter a valid email address.';
      }

      if (field.minLength && val && String(val).length < field.minLength) {
        newErrors[field.name] = `Must be at least ${field.minLength} characters.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatusMessage({ type: 'error', text: 'Please resolve highlighted errors.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setStatusMessage({ type: 'success', text: 'Form submitted successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    const resetState = {};
    fields.forEach((field) => {
      resetState[field.name] = field.type === 'checkbox' ? false : (field.defaultValue || '');
    });
    setFormData(resetState);
    setErrors({});
    setStatusMessage(null);
  };

  return (
    <div className={`reusable-form-card ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="form-header">
          {title && <h3 className="form-title">{title}</h3>}
          {subtitle && <p className="form-subtitle">{subtitle}</p>}
        </div>
      )}

      {statusMessage && (
        <div className={`form-status-alert status-${statusMessage.type}`} role="alert">
          {statusMessage.text}
        </div>
      )}

      <form className="dynamic-form" onSubmit={handleSubmit} noValidate>
        {fields.map((field) => {
          const fieldId = `form-field-${field.name}`;
          const hintId = `${fieldId}-hint`;
          const errorId = `${fieldId}-error`;
          const hasError = !!errors[field.name];

          if (field.type === 'checkbox') {
            return (
              <div key={field.name} className="form-field-checkbox">
                <input
                  type="checkbox"
                  id={fieldId}
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={(e) => handleChange(e, field)}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : (field.helperText ? hintId : undefined)}
                />
                <label htmlFor={fieldId} className="checkbox-label">
                  {field.label}
                  {field.required && <span className="req-star" aria-hidden="true">*</span>}
                </label>
                {hasError && <span id={errorId} className="field-error-text">{errors[field.name]}</span>}
              </div>
            );
          }

          return (
            <div key={field.name} className="form-field-group">
              <label htmlFor={fieldId} className="field-label">
                {field.label}
                {field.required && <span className="req-star" aria-hidden="true">*</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  id={fieldId}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field)}
                  className={`field-input ${hasError ? 'field-error' : ''}`}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : (field.helperText ? hintId : undefined)}
                >
                  <option value="">{field.placeholder || 'Select an option...'}</option>
                  {field.options?.map((opt) => {
                    const optVal = typeof opt === 'object' ? opt.value : opt;
                    const optLabel = typeof opt === 'object' ? opt.label : opt;
                    return (
                      <option key={optVal} value={optVal}>
                        {optLabel}
                      </option>
                    );
                  })}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={fieldId}
                  name={field.name}
                  rows={field.rows || 3}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field)}
                  placeholder={field.placeholder}
                  className={`field-input field-textarea ${hasError ? 'field-error' : ''}`}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : (field.helperText ? hintId : undefined)}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  id={fieldId}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field)}
                  placeholder={field.placeholder}
                  className={`field-input ${hasError ? 'field-error' : ''}`}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : (field.helperText ? hintId : undefined)}
                />
              )}

              {field.helperText && !hasError && (
                <span id={hintId} className="field-helper-text">{field.helperText}</span>
              )}
              {hasError && (
                <span id={errorId} className="field-error-text">{errors[field.name]}</span>
              )}
            </div>
          );
        })}

        <div className="form-button-row">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            {submitText}
          </Button>

          {resetText && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              {resetText}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
