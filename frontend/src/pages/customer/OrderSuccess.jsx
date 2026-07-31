import { Link } from 'react-router-dom';
import Button from '../../components/Button';
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
        <Button to="/products" variant="primary" size="lg" icon="🍩">
          Explore More Delicacies
        </Button>
      </div>
    </div>
  );
}