import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import styles from './Products.module.css';

const pastelColors = [
  '#FFE5F0',
  '#E1F8FA',
  '#FFF3C4',
  '#E3FBE9',
  '#F0E5FF',
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState(new Set());

  const activeCategory = searchParams.get('category') || '';
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    API.get('/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (searchTerm) params.search = searchTerm;

    API.get('/products', { params })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [activeCategory, searchTerm]);

  const handleCategoryClick = (catId) => {
    const next = new URLSearchParams(searchParams);
    if (catId) next.set('category', catId);
    else next.delete('category');
    setSearchParams(next);
  };

  const handleSearchChange = (e) => {
    const next = new URLSearchParams(searchParams);
    if (e.target.value) next.set('search', e.target.value);
    else next.delete('search');
    setSearchParams(next);
  };

  const clearSearch = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('search');
    setSearchParams(next);
  };

  const handleAddToCart = (p) => {
    addToCart(p);
    setAddedIds((prev) => {
      const next = new Set(prev);
      next.add(p._id);
      return next;
    });
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(p._id);
        return next;
      });
    }, 2000);
  };

  return (
    <div className={styles.page}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <span className={styles.eyebrow}>Sprinkles on top, ovens hot</span>
          <h1 className={styles.title}>The Delicacies Menu</h1>
          <p className={styles.subtitle}>
            Explore our artisanal glazed donuts, fluffy frosted cupcakes, ice cream sundaes, celebration cakes, and cookies.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Sticky Filter & Search Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search for donuts, cakes, pastries..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.search}
            />
            {searchTerm && (
              <button className={styles.clearSearchBtn} onClick={clearSearch}>✕</button>
            )}
          </div>

          <div className={styles.categoryBar}>
            <button
              className={`${styles.catBtn} ${!activeCategory ? styles.catActive : ''}`}
              style={{ backgroundColor: !activeCategory ? 'var(--cyan)' : '#FFF2F6' }}
              onClick={() => handleCategoryClick('')}
            >
              <span>🍩 All Treats</span>
            </button>

            {categories.map((cat, idx) => (
              <button
                key={cat._id}
                className={`${styles.catBtn} ${activeCategory === cat._id ? styles.catActive : ''}`}
                style={{
                  backgroundColor: activeCategory === cat._id ? 'var(--cyan)' : pastelColors[idx % pastelColors.length]
                }}
                onClick={() => handleCategoryClick(cat._id)}
              >
                {cat.image && (
                  <img
                    src={getImageUrl(cat.image)}
                    alt={cat.name}
                    className={styles.catThumb}
                    onError={(e) => handleImageError(e)}
                  />
                )}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.status}>Mixing the cake batter...</p>
          </div>
        ) : (
          <>
            {products.length === 0 && (
              <div className={styles.noResults}>
                <span className={styles.noResultsIcon}>🧁</span>
                <h3>No delicacies found</h3>
                <p>We couldn't find anything matching your search. Try resetting your search filter.</p>
                <button className={styles.resetBtn} onClick={() => setSearchParams({})}>
                  Show All Items
                </button>
              </div>
            )}

            <motion.div layout className={styles.grid}>
              <AnimatePresence mode="popLayout">
                {products.map((p, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    key={p._id}
                    className={styles.card}
                    whileHover={{ y: -6 }}
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
                        <span className={`${styles.badge} ${styles.soldOut}`}>Sold Out</span>
                      ) : p.stock <= 5 ? (
                        <span className={`${styles.badge} ${styles.lowStock}`}>Only {p.stock} Left</span>
                      ) : p.isFeatured ? (
                        <span className={`${styles.badge} ${styles.featuredBadge}`}>⭐ Top Pick</span>
                      ) : null}
                    </div>

                    <div className={styles.cardBody}>
                      <span className={styles.cardCategory}>{p.category?.name || 'Fresh Baked'}</span>
                      <Link to={`/products/${p._id}`} className={styles.cardName}>
                        {p.name}
                      </Link>

                      <div className={styles.ratingRow}>
                        <span className={styles.stars}>★★★★★</span>
                        <span className={styles.ratingScore}>4.9</span>
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
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}