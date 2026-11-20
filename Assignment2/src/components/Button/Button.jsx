import React from 'react';
import './Button.css';


export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={`custom-btn btn-${variant} btn-${size} ${isLoading ? 'btn-loading' : ''} ${className}`}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span>{loadingText || children || 'Loading...'}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="btn-icon btn-icon-left" aria-hidden="true">{icon}</span>
          )}
          {children && <span className="btn-content">{children}</span>}
          {icon && iconPosition === 'right' && (
            <span className="btn-icon btn-icon-right" aria-hidden="true">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
