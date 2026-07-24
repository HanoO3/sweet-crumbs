import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
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

  const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return img;
    }
    return `http://localhost:5000${img}`;
  };

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
            <span className={styles.eyebrow}>Baked fresh, daily with love</span>
            <h1 className={styles.heroTitle}>
              Cake Your Day<br /><span>& make it sweet.</span>
            </h1>
            <p className={styles.heroDesc}>
              Indulge in our colorful glazed donuts, tall frosted cupcakes, premium fudge cakes, and ice cream sundaes. Baked daily with the finest ingredients.
            </p>
            <div className={styles.heroActions}>
              <Link to="/products" className={styles.heroBtn}>
                Find Your Dessert
              </Link>
              <Link to="/about" className={styles.heroSecBtn}>
                Our Kitchen
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
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"
              alt="Artisanal Dessert Cake"
              className={styles.heroImg}
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Pastry Corner Donuts Banner */}
      <section className={styles.donutsBanner}>
        <div className={styles.donutsRow}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.bannerDonut}>
              <svg viewBox="0 0 54 54" width="70" height="70" fill="none">
                <circle cx="27" cy="27" r="22" fill={i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--cyan)" : "var(--yellow)"} />
                <circle cx="27" cy="27" r="7" fill="#FFE5F0" />
                <rect x="18" y="15" width="4" height="1.5" rx="0.5" transform="rotate(30 18 15)" fill="white" />
                <rect x="32" y="13" width="4" height="1.5" rx="0.5" transform="rotate(-45 32 13)" fill="var(--text-h)" />
                <rect x="38" y="22" width="4" height="1.5" rx="0.5" transform="rotate(15 38 22)" fill="white" />
                <rect x="22" y="36" width="4" height="1.5" rx="0.5" transform="rotate(-60 22 36)" fill="white" />
                <rect x="14" y="27" width="4" height="1.5" rx="0.5" transform="rotate(80 14 27)" fill="var(--text-h)" />
              </svg>
            </div>
          ))}
        </div>
        <h2 className={styles.bannerTitle}>PASTRY CORNER</h2>
        <p className={styles.bannerSubtitle}>We create delicious memories.</p>
        <div className={styles.donutsRow}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.bannerDonut}>
              <svg viewBox="0 0 54 54" width="70" height="70" fill="none">
                <circle cx="27" cy="27" r="22" fill={i % 3 === 0 ? "var(--yellow)" : i % 3 === 1 ? "var(--accent)" : "var(--cyan)"} />
                <circle cx="27" cy="27" r="7" fill="#FFE5F0" />
                <rect x="18" y="15" width="4" height="1.5" rx="0.5" transform="rotate(30 18 15)" fill="white" />
                <rect x="32" y="13" width="4" height="1.5" rx="0.5" transform="rotate(-45 32 13)" fill="var(--text-h)" />
                <rect x="38" y="22" width="4" height="1.5" rx="0.5" transform="rotate(15 38 22)" fill="white" />
                <rect x="22" y="36" width="4" height="1.5" rx="0.5" transform="rotate(-60 22 36)" fill="white" />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About Us Split Layout */}
      <section className={styles.aboutSplit}>
        <div className={styles.aboutLeft}>
          <div className={styles.aboutLeftContent}>
            <svg viewBox="0 0 100 40" width="120" height="50" fill="none" className={styles.aboutLogo}>
              <circle cx="20" cy="20" r="12" fill="var(--accent)" />
              <circle cx="20" cy="20" r="4" fill="white" />
              <circle cx="45" cy="20" r="12" fill="var(--text-h)" />
              <circle cx="45" cy="20" r="4" fill="white" />
              <circle cx="70" cy="20" r="12" fill="var(--cyan)" />
              <circle cx="70" cy="20" r="4" fill="white" />
            </svg>
            <h2 className={styles.aboutLeftTitle}>PASTRY CORNER</h2>
            <p className={styles.aboutLeftDesc}>
              Nothing beats Pastry Corner where everything we bake, we bake with love.
            </p>
            <p className={styles.aboutLeftSub}>
              From our kitchen to yours. Fun family memories begin here.
            </p>
          </div>
        </div>
        <div className={styles.aboutRight}>
          <div className={styles.aboutRightContent}>
            <h2 className={styles.aboutRightTitle}>ABOUT US</h2>
            <p className={styles.aboutRightSubtitle}>The sweetest place in town.</p>
            <div className={styles.aboutStrawberryImgContainer}>
              <img
                src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&auto=format&fit=crop"
                alt="Fresh Strawberries & Desserts"
                className={styles.aboutStrawberryImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sweet Classics Featured Menu */}
      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <h2 className={styles.sectionTitle}>SWEET CLASSICS</h2>
          <p className={styles.sectionSubtitle}>Let us put a smile on your face.</p>
          <div className={styles.titleDivider}></div>
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
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.cardImgContainer}>
                <Link to={`/products/${p._id}`}>
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.name}
                    className={styles.cardImg}
                  />
                </Link>
                {p.stock === 0 && (
                  <span className={styles.soldOutBadge}>Sold Out</span>
                )}
              </div>
              
              <div className={styles.cardBody}>
                <span className={styles.cardCategory}>{p.category?.name || 'Fresh Dessert'}</span>
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
    </div>
  );
}