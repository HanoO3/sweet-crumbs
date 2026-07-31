import { useState } from 'react';
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileSidebarOpen(false);
    navigate('/');
  };

  const getPageTitle = () => {
    if (location.pathname === '/admin/products') return 'Product Management';
    if (location.pathname === '/admin/categories') return 'Categories Management';
    if (location.pathname === '/admin/orders') return 'Order Management';
    return 'Store Analytics Dashboard';
  };

  return (
    <div className={styles.layout}>
      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div className={styles.overlay} onClick={() => setMobileSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.brand}>
            <svg viewBox="0 0 54 54" width="36" height="36" fill="none">
              <circle cx="27" cy="27" r="22" fill="var(--accent)" />
              <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
              <rect x="18" y="15" width="5" height="2" rx="1" transform="rotate(30 18 15)" fill="var(--cyan)" />
              <rect x="32" y="13" width="5" height="2" rx="1" transform="rotate(-45 32 13)" fill="var(--yellow)" />
            </svg>
            <div className={styles.brandTitle}>
              <span className={styles.brandName}>Sweet<span className={styles.accent}>Crumbs</span></span>
              <span className={styles.adminTag}>Control Center</span>
            </div>
          </Link>
          <button className={styles.closeSidebarBtn} onClick={() => setMobileSidebarOpen(false)}>✕</button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navGroupTitle}>MENU NAVIGATION</div>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className={styles.navIcon}>📊</span> Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className={styles.navIcon}>🧁</span> Products & Treats
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className={styles.navIcon}>🏷️</span> Categories
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className={styles.navIcon}>📦</span> Customer Orders
          </NavLink>

          <div className={styles.navGroupTitle} style={{ marginTop: '1.5rem' }}>STOREFRONT SHORTCUTS</div>
          <Link to="/" className={styles.homeLink}>
            <span className={styles.navIcon}>🏪</span> Live Bakery Website →
          </Link>
        </nav>

        {/* User Card */}
        <div className={styles.userCard}>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=FF7FB4&color=fff`}
            alt={user?.name}
            className={styles.userAvatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || 'Administrator'}</span>
            <span className={styles.userRole}>Store Owner</span>
          </div>
          <button onClick={handleLogout} className={styles.sidebarLogoutBtn} title="Logout">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className={styles.mainWrapper}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
          </div>

          <div className={styles.topbarRight}>
            <div className={styles.statusPill}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>Live Kitchen Server Active</span>
            </div>
            <button onClick={handleLogout} className={styles.topbarLogoutBtn}>
              🚪 Logout
            </button>
          </div>
        </header>

        {/* Page Outlet */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}