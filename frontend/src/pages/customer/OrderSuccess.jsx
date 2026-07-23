import { Link } from 'react-router-dom';
import styles from './OrderSuccess.module.css';

export default function OrderSuccess() {
  return (
    <div className={styles.page}>
      <div className={styles.icon}>✓</div>
      <h1>Order placed successfully!</h1>
      <p>Thank you for your order. We'll start preparing it right away.</p>
      <Link to="/products" className={styles.btn}>Continue Shopping</Link>
    </div>
  );
}