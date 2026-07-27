import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Col 1: Brand Info */}
          <div className={styles.colBrand}>
            <Link to="/" className={styles.brand}>
              <svg viewBox="0 0 54 54" width="40" height="40" fill="none">
                <circle cx="27" cy="27" r="22" fill="var(--accent)" />
                <circle cx="27" cy="27" r="7" fill="#FFFDFE" />
                <rect x="18" y="15" width="5" height="2" rx="1" transform="rotate(30 18 15)" fill="var(--cyan)" />
                <rect x="32" y="13" width="5" height="2" rx="1" transform="rotate(-45 32 13)" fill="var(--yellow)" />
              </svg>
              <span className={styles.brandName}>
                Sweet<span className={styles.brandAccent}>Crumbs</span>
              </span>
            </Link>
            <p className={styles.brandDesc}>
              Handcrafting artisanal donuts, fluffy cupcakes, specialty cakes, and chilled sundaes daily. Pure joy in every single bite!
            </p>
            <div className={styles.socials}>
              <a href="#instagram" aria-label="Instagram">📸</a>
              <a href="#facebook" aria-label="Facebook">📘</a>
              <a href="#whatsapp" aria-label="WhatsApp">💬</a>
              <a href="#pinterest" aria-label="Pinterest">📌</a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.list}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Explore Menu</Link></li>
              <li><Link to="/about">Our Bakery Story</Link></li>
              <li><Link to="/contact">Order Custom Cake</Link></li>
              <li><Link to="/cart">Cart & Checkout</Link></li>
            </ul>
          </div>

          {/* Col 3: Kitchen Hours & Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Kitchen Hours</h4>
            <p className={styles.hoursText}>
              <strong>Mon – Sat:</strong> 8:00 AM – 10:00 PM<br />
              <strong>Sunday:</strong> 9:00 AM – 9:00 PM
            </p>
            <div className={styles.contactInfo}>
              <p>📍 42 Baker Street, Pastry District</p>
              <p>📞 +92 (300) 555-CRUMB</p>
              <p>✉️ hello@sweetcrumbsbakery.com</p>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className={styles.colNewsletter}>
            <h4 className={styles.colTitle}>Sweet Treats Newsletter</h4>
            <p className={styles.newsletterDesc}>
              Subscribe to get secret weekend discount codes & seasonal cake alerts!
            </p>
            {subscribed ? (
              <div className={styles.subscribedMsg}>
                ✨ Welcome to the Sweet Crumbs family! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.form}>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.subBtn}>
                  Subscribe 🧁
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Sweet Crumbs Patisserie. All rights reserved.</p>
          <p className={styles.loveTag}>Made with ❤️ & fresh strawberry sprinkles</p>
        </div>
      </div>
    </footer>
  );
}
