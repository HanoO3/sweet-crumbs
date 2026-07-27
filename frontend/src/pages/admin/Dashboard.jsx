import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/products'),
      API.get('/categories'),
      API.get('/orders'),
    ])
      .then(([productsRes, categoriesRes, ordersRes]) => {
        const orders = ordersRes.data || [];
        const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        const pending = orders.filter((o) => o.status === 'Pending').length;

        setStats({
          products: (productsRes.data || []).length,
          categories: (categoriesRes.data || []).length,
          orders: orders.length,
          revenue,
          pending,
        });
        setRecentOrders(orders.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading analytics & store metrics...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.bannerText}>
          <h2>Welcome Back, Bakery Admin! 🧁</h2>
          <p>Here is your real-time store performance, revenue overview, and recent order activities.</p>
        </div>
        <div className={styles.quickActionsRow}>
          <Link to="/admin/products" className={styles.actionBtnPrimary}>
            + Add New Treat
          </Link>
          <Link to="/admin/orders" className={styles.actionBtnSec}>
            View All Orders ({stats.pending} Pending)
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIcon} style={{ background: '#FFE5F0', color: '#E05B91' }}>📦</span>
            <span className={styles.metricBadge}>In Store</span>
          </div>
          <span className={styles.metricLabel}>Total Products</span>
          <h3 className={styles.metricValue}>{stats.products}</h3>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIcon} style={{ background: '#E1F8FA', color: '#00ABB8' }}>🏷️</span>
            <span className={styles.metricBadge}>Active</span>
          </div>
          <span className={styles.metricLabel}>Categories</span>
          <h3 className={styles.metricValue}>{stats.categories}</h3>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIcon} style={{ background: '#FFF3C4', color: '#B88600' }}>🛒</span>
            <span className={styles.metricBadge}>Lifetime</span>
          </div>
          <span className={styles.metricLabel}>Total Orders</span>
          <h3 className={styles.metricValue}>{stats.orders}</h3>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIcon} style={{ background: '#FFEFE5', color: '#E55C00' }}>⏳</span>
            <span className={`${styles.metricBadge} ${styles.pendingBadge}`}>Action Needed</span>
          </div>
          <span className={styles.metricLabel}>Pending Orders</span>
          <h3 className={styles.metricValue}>{stats.pending}</h3>
        </div>

        <div className={`${styles.metricCard} ${styles.revenueCard}`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricIcon} style={{ background: 'rgba(255, 127, 180, 0.2)', color: '#FF7FB4' }}>💰</span>
            <span className={styles.metricBadge} style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white' }}>Total Sales</span>
          </div>
          <span className={styles.metricLabel} style={{ color: '#C0B1AA' }}>Total Revenue</span>
          <h3 className={styles.metricValue} style={{ color: 'white' }}>Rs. {stats.revenue.toLocaleString()}</h3>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div>
            <h3>Recent Orders</h3>
            <p>Latest customer orders placed on Sweet Crumbs.</p>
          </div>
          <Link to="/admin/orders" className={styles.tableLink}>
            Manage Orders →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className={styles.emptyText}>No orders received yet.</p>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o._id}>
                    <td>
                      <div className={styles.customerMeta}>
                        <strong>{o.user?.name || 'Guest Customer'}</strong>
                        <span>{o.shippingAddress?.city || 'Delivery'}</span>
                      </div>
                    </td>
                    <td>{o.items?.length || 0} Delicacies</td>
                    <td><strong className={styles.priceText}>Rs. {o.totalPrice}</strong></td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[o.status.toLowerCase()]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className={styles.dateText}>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}