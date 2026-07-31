import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo({
  size = 44,
  showText = true,
  textSize = 24,
  variant = 'default', // 'default' | 'light'
  subtitle = null,
  className = '',
  to = '/',
  onClick = null,
}) {
  const content = (
    <div className={`${styles.logoWrapper} ${className}`}>
      <svg
        className={styles.logoSvg}
        viewBox="0 0 54 54"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="27" cy="27" r="22" fill="var(--accent)" />
        <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
        <path
          d="M12 25C13 32 18 37 27 37C36 37 41 32 42 25"
          stroke="var(--accent-hover)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="18" y="15" width="5" height="2" rx="1" transform="rotate(30 18 15)" fill="var(--cyan)" />
        <rect x="32" y="13" width="5" height="2" rx="1" transform="rotate(-45 32 13)" fill="var(--yellow)" />
        <rect x="38" y="22" width="5" height="2" rx="1" transform="rotate(15 38 22)" fill="var(--cyan)" />
        <rect x="22" y="36" width="5" height="2" rx="1" transform="rotate(-60 22 36)" fill="var(--yellow)" />
      </svg>

      {showText && (
        <div className={styles.textGroup}>
          <span
            className={`${styles.brandName} ${variant === 'light' ? styles.lightText : ''}`}
            style={{ fontSize: `${textSize}px` }}
          >
            Sweet<span className={styles.logoAccent}>Crumbs</span>
          </span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={styles.logoLink} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={styles.logoClickable} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {content}
    </div>
  );
}
