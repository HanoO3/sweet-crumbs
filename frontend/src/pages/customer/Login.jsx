import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/users/login', form);
      login(res.data);
      const redirect = searchParams.get('redirect');
      navigate(redirect || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Welcome Back</h1>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className={styles.switchText}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}