import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className={styles.badge}
              >
                {cartCount}
              </motion.span>
            )}
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
            className={`${styles.hamburgerBtn} ${mobileOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.openLine1 : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.openLine2 : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.openLine3 : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Animated Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div className={styles.drawerHeader}>
                <div className={styles.drawerBrand}>
                  <svg viewBox="0 0 54 54" width="34" height="34" fill="none">
                    <circle cx="27" cy="27" r="22" fill="var(--accent)" />
                    <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
                  </svg>
                  <span>SweetCrumbs</span>
                </div>
                <button
                  className={styles.closeDrawerBtn}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className={styles.drawerLinks}>
                <Link to="/" className={location.pathname === '/' ? styles.drawerActiveLink : ''}>
                  <span className={styles.drawerIcon}>🏠</span> Home
                </Link>
                <Link to="/products" className={location.pathname === '/products' ? styles.drawerActiveLink : ''}>
                  <span className={styles.drawerIcon}>🧁</span> Delicacies Menu
                </Link>
                <Link to="/about" className={location.pathname === '/about' ? styles.drawerActiveLink : ''}>
                  <span className={styles.drawerIcon}>📖</span> Our Bakery Story
                </Link>
                <Link to="/contact" className={location.pathname === '/contact' ? styles.drawerActiveLink : ''}>
                  <span className={styles.drawerIcon}>📞</span> Contact Us
                </Link>
                <Link to="/cart" className={location.pathname === '/cart' ? styles.drawerActiveLink : ''}>
                  <span className={styles.drawerIcon}>🛒</span> Shopping Cart
                  {cartCount > 0 && <span className={styles.drawerBadge}>{cartCount}</span>}
                </Link>

                {user && user.role === 'admin' && (
                  <Link to="/admin" className={styles.drawerAdminLink}>
                    <span className={styles.drawerIcon}>⚙️</span> Admin Dashboard
                  </Link>
                )}
              </div>

              <div className={styles.drawerFooter}>
                {user ? (
                  <div className={styles.drawerUserBox}>
                    <div className={styles.drawerUserInfo}>
                      <span className={styles.drawerUserAvatar}>👤</span>
                      <div>
                        <strong>{user.name}</strong>
                        <p className={styles.drawerUserRole}>{user.role.toUpperCase()}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} className={styles.drawerLogoutBtn}>
                      🚪 Account Logout
                    </button>
                  </div>
                ) : (
                  <div className={styles.drawerAuthBtns}>
                    <Link to="/login" className={styles.drawerLoginBtn}>
                      Sign In
                    </Link>
                    <Link to="/register" className={styles.drawerRegisterBtn}>
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}