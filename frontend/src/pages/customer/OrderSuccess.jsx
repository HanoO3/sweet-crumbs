import { Link } from 'react-router-dom';
import styles from './OrderSuccess.module.css';

export default function OrderSuccess() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for choosing Sweet Crumbs! Our bakers are already preparing your fresh box with extra sprinkles and love.
        </p>
        <div className={styles.statusBox}>
          <span>🚚 Delivery Status:</span> <strong>Order Confirmed & Baking</strong>
        </div>
        <Link to="/products" className={styles.btn}>
          Explore More Delicacies 🍩
        </Link>
      </div>
    </div>
  );
}