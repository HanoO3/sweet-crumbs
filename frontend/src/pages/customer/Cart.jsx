import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
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
      <div className={styles.empty}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className={styles.shopBtn}>
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Your Cart</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <div key={item._id} className={styles.item}>
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className={styles.itemImg}
              />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>Rs. {item.price}</p>
              </div>

              <div className={styles.qtyControls}>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className={styles.itemSubtotal}>
                Rs. {item.price * item.quantity}
              </p>

              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>Rs. {cartTotal}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>Rs. {cartTotal}</span>
          </div>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}