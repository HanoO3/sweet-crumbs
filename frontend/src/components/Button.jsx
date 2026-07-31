import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'cyan' | 'danger' | 'dark' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  type = 'button',
  to = null,
  onClick,
  className = '',
  ...props
}) {
  const btnClasses = [
    styles.btn,
    styles[variant] || styles.primary,
    styles[size] || styles.md,
    fullWidth ? styles.fullWidth : '',
    disabled || loading ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? (
        <span className={styles.spinner}></span>
      ) : icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      <span>{children}</span>
    </>
  );

  if (to && !disabled && !loading) {
    return (
      <Link to={to} className={btnClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={btnClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
