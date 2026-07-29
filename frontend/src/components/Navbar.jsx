import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Brand Logo */}
        <Link to="/" className={styles.brand}>
          <svg className={styles.logoSvg} viewBox="0 0 54 54" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="27" cy="27" r="22" fill="var(--accent)" />
            <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
            <path d="M12 25C13 32 18 37 27 37C36 37 41 32 42 25" stroke="var(--accent-hover)" strokeWidth="2" strokeLinecap="round" />
            <rect x="18" y="15" width="5" height="2" rx="1" transform="rotate(30 18 15)" fill="var(--cyan)" />
            <rect x="32" y="13" width="5" height="2" rx="1" transform="rotate(-45 32 13)" fill="var(--yellow)" />
            <rect x="38" y="22" width="5" height="2" rx="1" transform="rotate(15 38 22)" fill="var(--cyan)" />
            <rect x="22" y="36" width="5" height="2" rx="1" transform="rotate(-60 22 36)" fill="var(--yellow)" />
          </svg>
          <span className={styles.brandName}>
            Sweet<span className={styles.logoAccent}>Crumbs</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.desktopLinks}>
          <Link to="/" className={location.pathname === '/' ? styles.activeLink : ''}>Home</Link>
          <Link to="/products" className={location.pathname === '/products' ? styles.activeLink : ''}>Menu</Link>
          <Link to="/about" className={location.pathname === '/about' ? styles.activeLink : ''}>Our Story</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? styles.activeLink : ''}>Contact</Link>
        </div>

        {/* Right Actions */}
        <div className={styles.actions}>
          <Link to="/cart" className={styles.cartLink} aria-label="Shopping Cart">
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.cartText}>Cart</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          {user ? (
            <div className={styles.userMenuDesktop}>
              <span className={styles.userName}>Hi, {user.name.split(' ')[0]}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className={styles.adminLink}>Dashboard</Link>
              )}
              <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className={styles.loginBtnDesktop}>Login</Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className={`${styles.hamburgerBtn} ${mobileOpen ? styles.hideHamburger : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.openLine1 : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.openLine2 : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.openLine3 : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)}></div>
      )}

      {/* Mobile Navigation Drawer */}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerBrand}>
            <svg viewBox="0 0 54 54" width="34" height="34" fill="none">
              <circle cx="27" cy="27" r="22" fill="var(--accent)" />
              <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
            </svg>
            <span>SweetCrumbs</span>
          </div>
          <button className={styles.closeDrawerBtn} onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <div className={styles.drawerLinks}>
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <span className={styles.drawerIcon}>🏠</span> Home
          </Link>
          <Link to="/products" onClick={() => setMobileOpen(false)}>
            <span className={styles.drawerIcon}>🧁</span> Delicacies Menu
          </Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>
            <span className={styles.drawerIcon}>📖</span> Our Bakery Story
          </Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>
            <span className={styles.drawerIcon}>📞</span> Contact Us
          </Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)}>
            <span className={styles.drawerIcon}>🛒</span> Shopping Cart ({cartCount})
          </Link>

          {user && user.role === 'admin' && (
            <Link to="/admin" onClick={() => setMobileOpen(false)} className={styles.drawerAdminLink}>
              <span className={styles.drawerIcon}>⚙️</span> Admin Dashboard
            </Link>
          )}

          {user && (
            <button onClick={handleLogout} className={styles.drawerLogoutNavLink}>
              <span className={styles.drawerIcon}>🚪</span> Logout ({user.name.split(' ')[0]})
            </button>
          )}
        </div>

        <div className={styles.drawerFooter}>
          {user ? (
            <div className={styles.drawerUserBox}>
              <p className={styles.drawerUserGreeting}>Signed in as <strong>{user.name}</strong> ({user.role})</p>
              <button onClick={handleLogout} className={styles.drawerLogoutBtn}>
                🚪 Account Logout
              </button>
            </div>
          ) : (
            <div className={styles.drawerAuthBtns}>
              <Link to="/login" className={styles.drawerLoginBtn} onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link to="/register" className={styles.drawerRegisterBtn} onClick={() => setMobileOpen(false)}>
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}