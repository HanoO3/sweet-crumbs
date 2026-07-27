import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch product details:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className={styles.page}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.status}>Preheating detail display...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className={styles.page}>
      <div className={styles.notFound}>
        <span>🧁</span>
        <h2>Treat not found</h2>
        <button onClick={() => navigate('/products')} className={styles.backLinkBtn}>
          Back to Menu
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <span>←</span> Back to Menu
        </button>

        <div className={styles.grid}>
          <div className={styles.imageCard}>
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className={styles.image}
              onError={(e) => handleImageError(e)}
            />
            {product.isFeatured && (
              <span className={styles.topBadge}>⭐ Masterpiece Cake</span>
            )}
          </div>

          <div className={styles.details}>
            {product.category && (
              <span className={styles.category}>{product.category.name}</span>
            )}
            <h1 className={styles.name}>{product.name}</h1>
            
            <div className={styles.ratingRow}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.ratingCount}>(38 Customer Reviews)</span>
            </div>

            <p className={styles.price}>Rs. {product.price}</p>
            <p className={styles.desc}>{product.description}</p>

            <div className={styles.featuresList}>
              <div className={styles.featurePill}>✨ 100% Butter Batter</div>
              <div className={styles.featurePill}>🚀 Same-day Delivery</div>
              <div className={styles.featurePill}>🌿 Eggless Option Available</div>
            </div>

            <p className={`${styles.stock} ${product.stock === 0 ? styles.outOfStock : ''}`}>
              {product.stock > 0
                ? `● ${product.stock} items fresh in store`
                : '✕ Sold out — baking more soon!'}
            </p>

            {product.stock > 0 && (
              <div className={styles.actionsBox}>
                <div className={styles.qtyRow}>
                  <label className={styles.qtyLabel}>Quantity</label>
                  <div className={styles.qtyControls}>
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button className={`${styles.addBtn} ${added ? styles.added : ''}`} onClick={handleAddToCart}>
                  {added ? 'Added to Cart ✓' : `Add ${quantity} to Cart • Rs. ${product.price * quantity}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}