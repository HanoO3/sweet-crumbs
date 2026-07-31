import React from 'react';
import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`${styles.skeletonImg} ${styles.shimmer}`}></div>
      <div className={styles.skeletonContent}>
        <div className={`${styles.skeletonBadge} ${styles.shimmer}`}></div>
        <div className={`${styles.skeletonTitle} ${styles.shimmer}`}></div>
        <div className={`${styles.skeletonText} ${styles.shimmer}`}></div>
        <div className={styles.skeletonFooter}>
          <div className={`${styles.skeletonPrice} ${styles.shimmer}`}></div>
          <div className={`${styles.skeletonBtn} ${styles.shimmer}`}></div>
        </div>
      </div>
    </div>
  );
}
