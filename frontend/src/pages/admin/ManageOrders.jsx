import { useEffect, useState } from 'react';
import API from '../../api/axios';
import styles from './ManageOrders.module.css';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    API.get('/orders').then((res) => {
      setOrders(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await API.put(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1 className={styles.title}>Manage Orders</h1>

      {orders.length === 0 && <p className={styles.empty}>No orders yet.</p>}

      <div className={styles.list}>
        {orders.map((order) => (
          <div key={order._id} className={styles.card}>
            <div className={styles.headerRow}>
              <div>
                <p className={styles.customer}>{order.user?.name || 'Customer'}</p>
                <p className={styles.email}>{order.user?.email}</p>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className={styles.statusSelect}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className={styles.items}>
              {order.items.map((item, i) => (
                <div key={i} className={styles.item}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className={styles.footerRow}>
              <span className={styles.address}>
                {order.shippingAddress?.address}, {order.shippingAddress?.city} —{' '}
                {order.shippingAddress?.phone}
              </span>
              <span className={styles.total}>Total: Rs. {order.totalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}