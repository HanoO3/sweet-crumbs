import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        <svg className={styles.logoSvg} viewBox="0 0 54 54" width="46" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pink Donut Glaze */}
          <circle cx="27" cy="27" r="22" fill="var(--accent)" />
          <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
          {/* Glaze Details/Shade */}
          <path d="M12 25C13 32 18 37 27 37C36 37 41 32 42 25" stroke="var(--accent-hover)" strokeWidth="2" strokeLinecap="round" />
          {/* Cute Sprinkles */}
          <rect x="18" y="15" width="5" height="2" rx="1" transform="rotate(30 18 15)" fill="var(--cyan)" />
          <rect x="32" y="13" width="5" height="2" rx="1" transform="rotate(-45 32 13)" fill="var(--yellow)" />
          <rect x="38" y="22" width="5" height="2" rx="1" transform="rotate(15 38 22)" fill="var(--cyan)" />
          <rect x="22" y="36" width="5" height="2" rx="1" transform="rotate(-60 22 36)" fill="var(--yellow)" />
          <rect x="14" y="27" width="5" height="2" rx="1" transform="rotate(80 14 27)" fill="var(--cyan)" />
        </svg>
        <span className={styles.brandName}>
          Sweet<span className={styles.logoAccent}>Crumbs</span>
        </span>
      </Link>

      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/products">Menu</Link>
        <Link to="/about">Our Story</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className={styles.actions}>
        <Link to="/cart" className={styles.cartLink}>
          <span className={styles.cartIcon}>🛒</span>
          <span className={styles.cartText}>Cart</span>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>

        {user ? (
          <div className={styles.userMenu}>
            <span className={styles.userName}>Hi, {user.name.split(' ')[0]}</span>
            {user.role === 'admin' && (
              <Link to="/admin" className={styles.adminLink}>Dashboard</Link>
            )}
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className={styles.loginBtn}>Login</Link>
        )}
      </div>
    </nav>
  );
}