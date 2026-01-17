import React from 'react';
import './Badge.css';
export function Badge({
  variant = 'secondary',
  className = '',
  children
}) {
  return <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>;
}