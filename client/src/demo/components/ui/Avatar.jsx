import React from 'react';
import './Avatar.css';
export function Avatar({
  src,
  alt,
  size = 'md',
  className = '',
  fallback
}) {
  return <div className={`avatar avatar-${size} ${className}`}>
      {src ? <img src={src} alt={alt} className="avatar-img" /> : <div className="avatar-fallback">
          {fallback || alt?.charAt(0).toUpperCase() || '?'}
        </div>}
    </div>;
}