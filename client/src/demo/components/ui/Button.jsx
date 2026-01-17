import React from 'react';
import './Button.css';
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return <button className={`btn btn-${variant} btn-${size} ${className}`} {...props}>
      {children}
    </button>;
}