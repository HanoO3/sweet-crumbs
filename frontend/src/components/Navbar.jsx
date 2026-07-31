import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import styles from './Navbar.module.css';

const drawerItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05 + 0.1,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent background scroll when drawer is open + cleanup
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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
        <Logo size={40} textSize={22} />

        {/* Desktop Links */}
        <div className={styles.desktopLinks}>
          <Link to="/" className={location.pathname === '/' ? styles.activeLink : ''}>
            Home
          </Link>
          <Link to="/products" className={location.pathname === '/products' ? styles.activeLink : ''}>
            Menu
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? styles.activeLink : ''}>
            Our Story
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? styles.activeLink : ''}>
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className={styles.actions}>
          {/* Cart */}
          <Link to="/cart" className={styles.cartLink} aria-label="Shopping Cart">
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.cartText}>Cart</span>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className={styles.badge}
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {/* Desktop User / Login */}
          {user ? (
            <div className={styles.userMenuDesktop}>
              <span className={styles.userName}>Hi, {user.name.split(' ')[0]}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className={styles.adminLink}>
                  Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className={styles.loginBtnDesktop}>
              Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            className={`${styles.hamburgerBtn} ${mobileOpen ? styles.hamburgerHidden : ''}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            >
              <div className={styles.drawerHeader}>
                <Logo size={34} textSize={19} onClick={() => setMobileOpen(false)} />
                <button
                  className={styles.closeDrawerBtn}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className={styles.drawerLinks}>
                <motion.div custom={0} variants={drawerItemVariants} initial="hidden" animate="visible">
                  <Link to="/" className={location.pathname === '/' ? styles.drawerActiveLink : ''}>
                    <span className={styles.drawerIcon}>🏠</span> Home
                  </Link>
                </motion.div>

                <motion.div custom={1} variants={drawerItemVariants} initial="hidden" animate="visible">
                  <Link
                    to="/products"
                    className={location.pathname === '/products' ? styles.drawerActiveLink : ''}
                  >
                    <span className={styles.drawerIcon}>🧁</span> Delicacies Menu
                  </Link>
                </motion.div>

                <motion.div custom={2} variants={drawerItemVariants} initial="hidden" animate="visible">
                  <Link to="/about" className={location.pathname === '/about' ? styles.drawerActiveLink : ''}>
                    <span className={styles.drawerIcon}>📖</span> Our Bakery Story
                  </Link>
                </motion.div>

                <motion.div custom={3} variants={drawerItemVariants} initial="hidden" animate="visible">
                  <Link
                    to="/contact"
                    className={location.pathname === '/contact' ? styles.drawerActiveLink : ''}
                  >
                    <span className={styles.drawerIcon}>📞</span> Contact Us
                  </Link>
                </motion.div>

                <motion.div custom={4} variants={drawerItemVariants} initial="hidden" animate="visible">
                  <Link to="/cart" className={location.pathname === '/cart' ? styles.drawerActiveLink : ''}>
                    <span className={styles.drawerIcon}>🛒</span> Shopping Cart
                    {cartCount > 0 && <span className={styles.drawerBadge}>{cartCount}</span>}
                  </Link>
                </motion.div>

                {user && user.role === 'admin' && (
                  <motion.div custom={5} variants={drawerItemVariants} initial="hidden" animate="visible">
                    <Link to="/admin" className={styles.drawerAdminLink}>
                      <span className={styles.drawerIcon}>⚙️</span> Admin Dashboard
                    </Link>
                  </motion.div>
                )}
              </div>

              <motion.div
                className={styles.drawerFooter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
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
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}