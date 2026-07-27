import { useEffect, useState } from 'react';
import API from '../../api/axios';
import styles from './ManageOrders.module.css';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const fetchOrders = () => {
    API.get('/orders').then((res) => {
      setOrders(res.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (id, status) => {
    API.put(`/orders/${id}/status`, { status }).then(() => fetchOrders());
  };

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'All') return true;
    return o.status === activeFilter;
  });

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Fetching customer orders...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Top Filter Bar */}
      <div className={styles.filterCard}>
        <div className={styles.filterHeader}>
          <h3>Filter Orders</h3>
          <span className={styles.totalOrdersCount}>{filteredOrders.length} Orders Shown</span>
        </div>

        <div className={styles.statusPills}>
          <button
            className={`${styles.pillBtn} ${activeFilter === 'All' ? styles.activePill : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            All Orders ({orders.length})
          </button>
          {STATUSES.map((st) => {
            const count = orders.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                className={`${styles.pillBtn} ${activeFilter === st ? styles.activePill : ''}`}
                onClick={() => setActiveFilter(st)}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className={styles.emptyCard}>
          <span>📦</span>
          <h3>No {activeFilter === 'All' ? '' : activeFilter} orders found</h3>
          <p>When customers place orders on Sweet Crumbs, they will appear here live.</p>
        </div>
      ) : (
        <div className={styles.ordersGrid}>
          {filteredOrders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <div className={styles.customerBox}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(order.user?.name || 'Customer')}&background=FF7FB4&color=fff`}
                    alt="Customer"
                    className={styles.customerAvatar}
                  />
                  <div>
                    <h4 className={styles.customerName}>{order.user?.name || 'Guest Customer'}</h4>
                    <span className={styles.customerEmail}>{order.user?.email}</span>
                  </div>
                </div>

                <div className={styles.statusControl}>
                  <label className={styles.statusLabel}>Order Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`${styles.statusSelect} ${styles[order.status.toLowerCase()]}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div className={styles.itemsBox}>
                <span className={styles.boxTitle}>ORDER ITEMS ({order.items?.length || 0})</span>
                {order.items?.map((item, i) => (
                  <div key={i} className={styles.itemRow}>
                    <span className={styles.itemName}>• {item.name} <strong className={styles.itemQty}>× {item.quantity}</strong></span>
                    <span className={styles.itemPrice}>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Footer Meta */}
              <div className={styles.cardFooter}>
                <div className={styles.addressBox}>
                  <span className={styles.addressTitle}>📍 Delivery Address</span>
                  <p className={styles.addressText}>
                    {order.shippingAddress?.fullName ? `${order.shippingAddress.fullName}, ` : ''}
                    {order.shippingAddress?.address}, {order.shippingAddress?.city}
                  </p>
                  <p className={styles.phoneText}>📞 {order.shippingAddress?.phone}</p>
                </div>

                <div className={styles.totalBox}>
                  <span className={styles.totalLabel}>Total Price</span>
                  <span className={styles.totalAmount}>Rs. {order.totalPrice}</span>
                  <span className={styles.paymentMethod}>💵 {order.paymentMethod || 'Cash on Delivery'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}