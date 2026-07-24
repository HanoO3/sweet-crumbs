import { NavLink, Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Sweet Crumbs<span>Admin</span></h2>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.homeLink}>
            ← Back to Home
          </NavLink>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? styles.active : ''}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? styles.active : ''}>
            Products
          </NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => isActive ? styles.active : ''}>
            Categories
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? styles.active : ''}>
            Orders
          </NavLink>
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}