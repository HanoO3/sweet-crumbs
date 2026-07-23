import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
import heroImage from '../../assets/hero.png';
import styles from './Home.module.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState(new Set());

  useEffect(() => {
    API.get('/products')
      .then((res) => {
        setFeatured(res.data.filter((p) => p.isFeatured).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className={styles.eyebrow}>Baked fresh, daily</span>
            <h1 className={styles.heroTitle}>
              Every batch<br /><span>tells a story.</span>
            </h1>
            <p className={styles.heroDesc}>
              Handcrafted cakes, golden pastries, and premium sweets — baked daily with real butter, organic ingredients, and zero shortcuts.
            </p>
            <div className={styles.heroActions}>
              <Link to="/products" className={styles.heroBtn}>
                Explore Our Menu
              </Link>
              <Link to="/about" className={styles.heroSecBtn}>
                Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className={styles.imageBacking}></div>
            <img src={heroImage} alt="Premium Baked Goods" className={styles.heroImg} />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <span className={styles.sectionEyebrow}>Fresh From The Oven</span>
          <h2 className={styles.sectionTitle}>Today's Favorites</h2>
          <div className={styles.titleDivider}></div>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.status}>Loading our daily fresh collection...</p>
          </div>
        )}
        {!loading && featured.length === 0 && (
          <p className={styles.status}>
            No featured products yet — check back soon or visit our admin panel to feature some treats!
          </p>
        )}

        <div className={styles.grid}>
          {featured.map((p, idx) => (
            <motion.div
              key={p._id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.cardImgContainer}>
                <Link to={`/products/${p._id}`}>
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt={p.name}
                    className={styles.cardImg}
                  />
                </Link>
                {p.stock <= 5 && p.stock > 0 && (
                  <span className={styles.stockBadge}>Selling Fast</span>
                )}
                {p.stock === 0 && (
                  <span className={`${styles.stockBadge} ${styles.outOfStockBadge}`}>Sold Out</span>
                )}
              </div>
              
              <div className={styles.cardBody}>
                <span className={styles.cardCategory}>{p.category?.name || 'Fresh Baked'}</span>
                <Link to={`/products/${p._id}`} className={styles.cardName}>
                  {p.name}
                </Link>
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>Rs. {p.price}</span>
                  {p.stock === 0 ? (
                    <button className={styles.soldOutBtn} disabled>Out of Stock</button>
                  ) : (
                    <button
                      className={`${styles.addBtn} ${addedIds.has(p._id) ? styles.added : ''}`}
                      onClick={() => handleAddToCart(p)}
                    >
                      {addedIds.has(p._id) ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Brand Promise Section */}
      <section className={styles.promise}>
        <div className={styles.promiseGrid}>
          <div className={styles.promiseCard}>
            <span className={styles.promiseIcon}>🌾</span>
            <h3>100% Organic</h3>
            <p>We source premium, unbleached flour, raw cane sugar, and rich organic dairy.</p>
          </div>
          <div className={styles.promiseCard}>
            <span className={styles.promiseIcon}>🥖</span>
            <h3>Baked Daily</h3>
            <p>No day-old leftovers. We pre-heat the ovens at 4:00 AM to ensure fresh warmth every morning.</p>
          </div>
          <div className={styles.promiseCard}>
            <span className={styles.promiseIcon}>👨‍🍳</span>
            <h3>Artisanal Care</h3>
            <p>Our experienced bakers knead, mold, and decorate every pastry by hand with pure love.</p>
          </div>
        </div>
      </section>
    </div>
  );
}