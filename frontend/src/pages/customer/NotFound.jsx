import { Link } from 'react-router-dom';
import styles from './StaticPage.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🧁 404</span>
        <h1 className={styles.title} style={{ marginBottom: '0.5rem' }}>Oops! Page Not Found</h1>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>
          Looks like the sweet treat or page you were looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.backBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
          ← Back to Fresh Home
        </Link>
      </div>
    </div>
  );
}
