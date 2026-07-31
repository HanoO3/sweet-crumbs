import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './MobileCartBar.module.css';

export default function MobileCartBar() {
  const { cartCount, cartTotal } = useCart();
  const location = useLocation();

  // Hide mobile cart bar on cart, checkout, and order-success pages
  const hiddenRoutes = ['/cart', '/checkout', '/order-success'];
  if (cartCount === 0 || hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <div className={styles.info}>
        <span className={styles.badge}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
        <span className={styles.total}>Rs. {cartTotal}</span>
      </div>

      <Link to="/cart" className={styles.viewBtn}>
        <span>View Cart</span>
        <span className={styles.arrow}>→</span>
      </Link>
    </div>
  );
}
