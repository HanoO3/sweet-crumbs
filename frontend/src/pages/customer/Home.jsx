import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import CustomerReviews from '../../components/CustomerReviews';
import styles from './Home.module.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState(new Set());

  useEffect(() => {
    API.get('/products')
      .then((res) => {
        setFeatured(res.data.filter((p) => p.isFeatured).slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedIds((prev) => {
      const next = new Set(prev);
      next.add(product._id);
      return next;
    });
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product._id);
        return next;
      });
    }, 2000);
  };

  return (
    <div className={styles.page}>
      {/* 1. High Impact Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlowOverlay}></div>

        <div className={styles.heroContainer}>
          {/* Hero Left Content */}
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.eyebrowBox}>
              <span className={styles.eyebrowPulse}></span>
              <span className={styles.eyebrowText}>✨ Baked Fresh Daily With Organic French Butter</span>
            </div>

            <h1 className={styles.heroTitle}>
              Cake Your Day <br />
              <span className={styles.gradientTitle}>& Make It Sweet.</span>
            </h1>

            <p className={styles.heroDesc}>
              Indulge in artisanal glazed donuts, tall frosted velvet cupcakes, Belgian chocolate fudge cakes, and authentic handcrafted desserts baked fresh every morning with pure love.
            </p>

            <div className={styles.heroActions}>
              <Link to="/products" className={styles.heroBtnPrimary}>
                <span>Explore Full Menu</span>
                <span className={styles.btnIcon}>🍩</span>
              </Link>
              <Link to="/about" className={styles.heroBtnSecondary}>
                <span>Our Secret Kitchen</span>
                <span className={styles.btnIcon}>👩‍🍳</span>
              </Link>
            </div>

            {/* Glassmorphism Quick Stats Bar */}
            <div className={styles.heroStatsGlass}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Fresh Organic</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>4.9 ★</span>
                <span className={styles.statLabel}>Customer Rating</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>30 Min</span>
                <span className={styles.statLabel}>Express Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visual Showcase */}
          <motion.div
            className={styles.heroVisualWrapper}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.auraRing}></div>
            <div className={styles.imageBackingCard}></div>

            <img
              src="/hero-dessert.png"
              alt="Artisanal Belgian Chocolate & Glazed Strawberry Dessert Cake"
              className={styles.heroMainImg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop";
              }}
            />

            {/* Floating Animated Badges */}
            <motion.div
              className={`${styles.floatingBadge} ${styles.badgeTopLeft}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            >
              <span className={styles.badgeEmoji}>🍩</span>
              <div>
                <strong>Oven Fresh</strong>
                <p>Ready to devour</p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.floatingBadge} ${styles.badgeBottomRight}`}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <span className={styles.badgeEmoji}>🍓</span>
              <div>
                <strong>Strawberry Frosting</strong>
                <p>#1 Top Seller Today</p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.floatingBadge} ${styles.badgeCenterRight}`}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <span className={styles.badgeEmoji}>⚡</span>
              <div>
                <strong>30-Min Delivery</strong>
                <p>Warm & Protected</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <motion.div
            className={styles.featureCard}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className={styles.featureIcon}>🧁</span>
            <h3>Handcrafted Daily</h3>
            <p>Every single pastry and doughnut is prepared fresh from scratch every morning.</p>
          </motion.div>

          <motion.div
            className={styles.featureCard}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className={styles.featureIcon}>🌾</span>
            <h3>Organic Ingredients</h3>
            <p>We use premium French butter, pure Belgian cocoa, and organic flour.</p>
          </motion.div>

          <motion.div
            className={styles.featureCard}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className={styles.featureIcon}>🚀</span>
            <h3>Express Delivery</h3>
            <p>Packed in temperature-guarded eco boxes so your cakes arrive oven-fresh.</p>
          </motion.div>

          <motion.div
            className={styles.featureCard}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className={styles.featureIcon}>🎂</span>
            <h3>Custom Designs</h3>
            <p>Need a special birthday or wedding cake? We tailor designs to your dreams.</p>
          </motion.div>
        </div>
      </section>

      {/* 3. Interactive Pastry Banner */}
      <section className={styles.donutsBanner}>
        <div className={styles.donutsRow}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.bannerDonut}>
              <svg viewBox="0 0 54 54" width="54" height="54" fill="none">
                <circle cx="27" cy="27" r="22" fill={i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--cyan)" : "var(--yellow)"} />
                <circle cx="27" cy="27" r="7" fill="#FFE5F0" />
                <rect x="18" y="15" width="4" height="1.5" rx="0.5" transform="rotate(30 18 15)" fill="white" />
                <rect x="32" y="13" width="4" height="1.5" rx="0.5" transform="rotate(-45 32 13)" fill="var(--text-h)" />
              </svg>
            </div>
          ))}
        </div>
        <h2 className={styles.bannerTitle}>THE PASTRY CORNER</h2>
        <p className={styles.bannerSubtitle}>Creating unforgettable sweet memories every day.</p>
      </section>

      {/* 4. Featured Classics Menu Products */}
      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <span className={styles.sectionEyebrow}>Baking Hot Right Now</span>
          <h2 className={styles.sectionTitle}>SWEET CLASSICS</h2>
          <p className={styles.sectionSubtitle}>Hand-picked customer favorites ready for instant delivery.</p>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.status}>Mixing the frosting...</p>
          </div>
        )}

        <div className={styles.grid}>
          {featured.map((p, idx) => (
            <motion.div
              key={p._id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.cardImgContainer}>
                <Link to={`/products/${p._id}`}>
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.name}
                    className={styles.cardImg}
                    onError={(e) => handleImageError(e)}
                  />
                </Link>
                {p.stock === 0 ? (
                  <span className={styles.soldOutBadge}>Sold Out</span>
                ) : (
                  <span className={styles.bestsellerBadge}>🔥 Bestseller</span>
                )}
              </div>
              
              <div className={styles.cardBody}>
                <span className={styles.cardCategory}>{p.category?.name || 'Fresh Dessert'}</span>
                <Link to={`/products/${p._id}`} className={styles.cardName}>
                  {p.name}
                </Link>
                
                <div className={styles.ratingRow}>
                  <span className={styles.stars}>★★★★★</span>
                  <span className={styles.ratingText}>(4.9)</span>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>Rs. {p.price}</span>
                  {p.stock === 0 ? (
                    <button className={styles.soldOutBtn} disabled>Out of Stock</button>
                  ) : (
                    <button
                      className={`${styles.addBtn} ${addedIds.has(p._id) ? styles.added : ''}`}
                      onClick={() => handleAddToCart(p)}
                    >
                      {addedIds.has(p._id) ? 'Added ✓' : '+ Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.viewMoreWrapper}>
          <Link to="/products" className={styles.viewMoreBtn}>
            Explore Full Delicacies Menu →
          </Link>
        </div>
      </section>

      {/* 5. Customer Reviews Section */}
      <CustomerReviews />
    </div>
  );
}