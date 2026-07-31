import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import styles from './Auth.module.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/users/register', form);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to create account. Email might be registered already.'
      );
    } finally {
      setLoading(false);
    }
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
              <rect
                x="18"
                y="15"
                width="5"
                height="2"
                rx="1"
                transform="rotate(30 18 15)"
                fill="var(--cyan)"
              />
              <rect
                x="32"
                y="13"
                width="5"
                height="2"
                rx="1"
                transform="rotate(-45 32 13)"
                fill="var(--yellow)"
              />
            </svg>
            <h2>
              Sweet<span className={styles.logoAccent}>Crumbs</span>
            </h2>
          </div>

          <h2 className={styles.brandHeadline}>
            Join Our Bakery<br />
            <span>Dessert Club!</span>
          </h2>
          <p className={styles.brandSub}>
            Create your account today to save your favorite treats, get instant
            order updates, and unlock member rewards!
          </p>

          <div className={styles.perksList}>
            <div className={styles.perkItem}>
              <span>🎁</span> Special welcome discount on your first order
            </div>
            <div className={styles.perkItem}>
              <span>⚡</span> Fast 1-click checkout with saved addresses
            </div>
            <div className={styles.perkItem}>
              <span>⭐</span> Rate & review your favorite bakeries & treats
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h1>Create Account</h1>
            <p>Join thousands of dessert lovers in town.</p>
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
            <label>Full Name</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                type="text"
                name="name"
                placeholder="e.g. Sana Riaz"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✉️</span>
              <input
                type="email"
                name="email"
                placeholder="sana@example.com"
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
                placeholder="At least 6 characters..."
                value={form.password}
                onChange={handleChange}
                minLength={6}
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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            {loading ? 'Creating Account...' : 'Create My Account →'}
          </Button>

          <div className={styles.switchBox}>
            <span>Already have an account?</span>
            <Link to="/login" className={styles.switchLink}>
              Sign In
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}