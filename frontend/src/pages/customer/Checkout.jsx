import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
import styles from './Checkout.module.css';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);

    try {
      const items = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      await API.post('/orders', {
        items,
        shippingAddress: form,
        totalPrice: cartTotal,
        paymentMethod: 'Cash on Delivery',
      });

      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order');
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyBox}>
          <span>🧁</span>
          <h2>Your cart is empty</h2>
          <p>Please add some bakery items to your cart before checking out.</p>
          <Link to="/products" className={styles.shopBtn}>
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.subtitle}>Complete your delivery details to confirm your order.</p>

        <div className={styles.layout}>
          <form className={styles.formCard} onSubmit={handlePlaceOrder}>
            <h2 className={styles.sectionHeading}>📦 Shipping & Delivery Address</h2>

            {error && <div className={styles.errorBanner}>{error}</div>}

            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                name="fullName"
                placeholder="e.g. Ayesha Malik"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Delivery Address</label>
              <input
                name="address"
                placeholder="House / Apartment number, Street name"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.rowTwo}>
              <div className={styles.inputGroup}>
                <label>City</label>
                <input
                  name="city"
                  placeholder="e.g. Lahore, Karachi"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Mobile Phone</label>
                <input
                  name="phone"
                  placeholder="0300-1234567"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.paymentBox}>
              <div className={styles.paymentHeader}>
                <span>💵 Payment Method</span>
                <span className={styles.codBadge}>Cash on Delivery</span>
              </div>
              <p className={styles.paymentDesc}>
                Pay conveniently with cash when your fresh bakery box arrives at your doorstep.
              </p>
            </div>

            <button className={styles.placeBtn} type="submit" disabled={placing}>
              {placing ? 'Baking & Confirming Order...' : `Confirm & Place Order — Rs. ${cartTotal}`}
            </button>
          </form>

          <div className={styles.summaryCard}>
            <h2 className={styles.sectionHeading}>🛒 Order Items</h2>
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item._id} className={styles.summaryItem}>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotal}>
              <span>Grand Total</span>
              <span>Rs. {cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}