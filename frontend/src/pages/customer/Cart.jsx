import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import Button from '../../components/Button';
import styles from './Cart.module.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.emptyCard}>
          <span className={styles.emptyIcon}>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't picked your favorite sweet delicacies yet.</p>
          <Button to="/products" variant="primary" size="lg">
            Explore Delicacies Menu 🍩
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Bakery Cart</h1>
          <p className={styles.subtitle}>Review your items before proceeding to checkout.</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.items}>
            {cartItems.map((item) => (
              <div key={item._id} className={styles.itemCard}>
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className={styles.itemImg}
                  onError={(e) => handleImageError(e)}
                />
                <div className={styles.itemInfo}>
                  <Link to={`/products/${item._id}`} className={styles.itemName}>
                    {item.name}
                  </Link>
                  <p className={styles.itemPrice}>Rs. {item.price} each</p>
                </div>

                <div className={styles.qtyControls}>
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <div className={styles.subtotalBox}>
                  <span className={styles.subtotalLabel}>Subtotal:</span>
                  <span className={styles.itemSubtotal}>Rs. {item.price * item.quantity}</span>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item._id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal ({cartItems.length} items)</span>
              <span>Rs. {cartTotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Fresh Packing & Box</span>
              <span className={styles.freeBadge}>FREE</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Delivery</span>
              <span>Calculated at checkout</span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total Amount</span>
              <span>Rs. {cartTotal}</span>
            </div>

            <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
              Proceed to Checkout →
            </Button>

            <Link to="/products" className={styles.continueLink}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}