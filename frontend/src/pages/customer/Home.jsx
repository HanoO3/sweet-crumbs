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
      .catch((err) => {
        console.error('Failed to fetch featured products:', err);
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
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className={styles.eyebrow}>✨ Baked Fresh Daily With Organic Butter</span>
            <h1 className={styles.heroTitle}>
              Cake Your Day<br /><span>& Make It Sweet.</span>
            </h1>
            <p className={styles.heroDesc}>
              Indulge in our colorful glazed donuts, tall frosted cupcakes, Belgian fudge cakes, and ice cream sundaes. Prepared fresh every morning with pure love.
            </p>
            <div className={styles.heroActions}>
              <Link to="/products" className={styles.heroBtn}>
                Explore Full Menu 🍩
              </Link>
              <Link to="/about" className={styles.heroSecBtn}>
                Our Secret Kitchen 👩‍🍳
              </Link>
            </div>

            {/* Quick Stats */}
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Fresh Ingredients</span>
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

          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className={styles.imageBacking}></div>
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=700&auto=format&fit=crop"
              alt="Artisanal Dessert Cake"
              className={styles.heroImg}
              onError={(e) => handleImageError(e)}
            />
            <div className={styles.floatingBadge}>
              <span className={styles.badgeIcon}>🍓</span>
              <div>
                <strong>Strawberry Frosting</strong>
                <p>Top Seller Today</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🧁</span>
            <h3>Handcrafted Daily</h3>
            <p>Every single pastry and doughnut is prepared fresh from scratch every morning.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🌾</span>
            <h3>Organic Ingredients</h3>
            <p>We use premium French butter, pure Belgian cocoa, and organic flour.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🚀</span>
            <h3>Warm Delivery</h3>
            <p>Packed in temperature-guarded eco boxes so your cakes arrive oven-fresh.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎂</span>
            <h3>Custom Designs</h3>
            <p>Need a special birthday or wedding cake? We tailor designs to your dreams.</p>
          </div>
        </div>
      </section>

      {/* 3. Pastry Banner */}
      <section className={styles.donutsBanner}>
        <div className={styles.donutsRow}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.bannerDonut}>
              <svg viewBox="0 0 54 54" width="60" height="60" fill="none">
                <circle cx="27" cy="27" r="22" fill={i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--cyan)" : "var(--yellow)"} />
                <circle cx="27" cy="27" r="7" fill="#FFE5F0" />
                <rect x="18" y="15" width="4" height="1.5" rx="0.5" transform="rotate(30 18 15)" fill="white" />
                <rect x="32" y="13" width="4" height="1.5" rx="0.5" transform="rotate(-45 32 13)" fill="var(--text-h)" />
              </svg>
            </div>
          ))}
        </div>
        <h2 className={styles.bannerTitle}>PASTRY CORNER</h2>
        <p className={styles.bannerSubtitle}>Creating unforgettable sweet memories every day.</p>
      </section>

      {/* 4. Featured Menu Products */}
      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <span className={styles.eyebrow}>Baking Hot Right Now</span>
          <h2 className={styles.sectionTitle}>SWEET CLASSICS</h2>
          <p className={styles.sectionSubtitle}>Hand-picked customer favorites ready for instant order.</p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
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
            View All Delicacies Menu →
          </Link>
        </div>
      </section>

      {/* 5. Customer Reviews Section */}
      <CustomerReviews />
    </div>
  );
}