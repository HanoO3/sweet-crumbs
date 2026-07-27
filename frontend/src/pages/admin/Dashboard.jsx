import { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          API.get('/products'),
          API.get('/categories'),
          API.get('/orders'),
        ]);

        const orders = ordersRes.data || [];
        const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
        const pending = orders.filter((o) => o.status === 'Pending').length;

        if (isMounted) {
          setStats({
            products: (productsRes.data || []).length,
            categories: (categoriesRes.data || []).length,
            orders: orders.length,
            revenue,
            pending,
          });
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        if (isMounted) setError('Could not load store analytics');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStats();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className={styles.loading}>Loading dashboard metrics...</div>;

  return (
    <div>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Here's what's happening in your bakery store.</p>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.label}>Total Products</span>
          <span className={styles.value}>{stats.products}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.label}>Categories</span>
          <span className={styles.value}>{stats.categories}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.label}>Total Orders</span>
          <span className={styles.value}>{stats.orders}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.label}>Pending Orders</span>
          <span className={styles.value}>{stats.pending}</span>
        </div>
        <div className={`${styles.card} ${styles.revenueCard}`}>
          <span className={styles.label}>Total Revenue</span>
          <span className={styles.value}>Rs. {stats.revenue}</span>
        </div>
      </div>
    </div>
  );
}