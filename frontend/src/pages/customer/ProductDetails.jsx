import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import { useCart } from '../../context/CartContext';
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
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className={styles.page}><p className={styles.status}>Preheating detail display...</p></div>;
  if (!product) return <div className={styles.page}><p className={styles.status}>Treat not found.</p></div>;

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <span>←</span> Back to Menu
      </button>

      <div className={styles.grid}>
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className={styles.image}
        />

        <div className={styles.details}>
          {product.category && (
            <span className={styles.category}>{product.category.name}</span>
          )}
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>Rs. {product.price}</p>
          <p className={styles.desc}>{product.description}</p>

          <p className={`${styles.stock} ${product.stock === 0 ? styles.outOfStock : ''}`}>
            {product.stock > 0
              ? `${product.stock} items fresh in store`
              : 'Sold out — baking more soon!'}
          </p>

          {product.stock > 0 && (
            <>
              <div className={styles.qtyRow}>
                <span>Select Quantity</span>
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

              <button className={styles.addBtn} onClick={handleAddToCart}>
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}