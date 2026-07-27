import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './MobileCartBar.module.css';

export default function MobileCartBar() {
  const { cartCount, cartTotal } = useCart();

  if (cartCount === 0) return null;

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
