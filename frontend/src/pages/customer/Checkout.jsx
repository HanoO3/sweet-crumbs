import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    return <p className={styles.status}>Your cart is empty.</p>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handlePlaceOrder}>
          <h2>Shipping Details</h2>

          {error && <p className={styles.error}>{error}</p>}

          <label>Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <label>City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <div className={styles.paymentNote}>
            Payment method: <strong>Cash on Delivery</strong>
          </div>

          <button className={styles.placeBtn} type="submit" disabled={placing}>
            {placing ? 'Placing order...' : `Place Order — Rs. ${cartTotal}`}
          </button>
        </form>

        <div className={styles.summary}>
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item._id} className={styles.summaryItem}>
              <span>{item.name} × {item.quantity}</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>Rs. {cartTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}