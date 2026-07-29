import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    API.post('/users/login', form)
      .then((res) => {
        login(res.data);
        const redirect = searchParams.get('redirect');
        navigate(redirect || '/');
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.response?.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (err.response?.status >= 500) {
          setError('Server error occurred. Please try again in a few moments.');
        } else if (!err.response) {
          setError('Network error. Unable to connect to server.');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.authWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side: Brand Visual */}
        <div className={styles.brandSide}>
          <div className={styles.brandBadge}>
            <svg viewBox="0 0 54 54" width="46" height="46" fill="none">
              <circle cx="27" cy="27" r="22" fill="var(--accent)" />
              <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
              <rect x="18" y="15" width="5" height="2" rx="1" transform="rotate(30 18 15)" fill="var(--cyan)" />
              <rect x="32" y="13" width="5" height="2" rx="1" transform="rotate(-45 32 13)" fill="var(--yellow)" />
            </svg>
            <h2>Sweet Crumbs</h2>
          </div>

          <h2 className={styles.brandHeadline}>
            Welcome Back to<br /><span>Your Sweet Spot.</span>
          </h2>
          <p className={styles.brandSub}>
            Sign in to check out faster, track your artisan orders, and enjoy exclusive member discounts!
          </p>

          <div className={styles.perksList}>
            <div className={styles.perkItem}>
              <span>🍩</span> Express 30-min local bakery delivery
            </div>
            <div className={styles.perkItem}>
              <span>🍓</span> Fresh organic ingredients baked daily
            </div>
            <div className={styles.perkItem}>
              <span>🎂</span> Custom birthday & party cake bookings
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h1>Sign In</h1>
            <p>Enter your account credentials to continue.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.errorBanner}
            >
              ⚠️ {error}
            </motion.div>
          )}

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✉️</span>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.btnLoading}>
                <span className={styles.miniSpinner}></span> Authenticating...
              </span>
            ) : (
              'Sign In To My Account →'
            )}
          </button>

          <div className={styles.switchBox}>
            <span>New to Sweet Crumbs?</span>
            <Link to="/register" className={styles.switchLink}>
              Create an Account
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}