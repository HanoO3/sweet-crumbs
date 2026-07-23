import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
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
        <img src={logo} alt="Sweet Crumbs Logo" className={styles.logoImg} />
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