import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import styles from './CartToast.module.css';

export default function CartToast({ item, onClose }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.toastContainer}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className={styles.toastCard}>
          <img
            src={getImageUrl(item.image)}
            alt={item.name}
            className={styles.toastImg}
            onError={handleImageError}
          />
          <div className={styles.toastInfo}>
            <div className={styles.toastHeader}>
              <span className={styles.checkBadge}>✓ Added to Bag!</span>
            </div>
            <p className={styles.toastName}>{item.name}</p>
            <p className={styles.toastPrice}>Rs. {item.price}</p>
          </div>
          <div className={styles.toastActions}>
            <Link to="/cart" className={styles.viewCartBtn} onClick={onClose}>
              View Cart 🛒
            </Link>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
