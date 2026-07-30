import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axios';
import styles from './CustomerReviews.module.css';

// ===== FAKE REVIEWS (yeh hamesha rahenge) =====
const initialReviews = [
  {
    id: '1',
    name: 'Ayesha Khan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    date: '2 days ago',
    product: 'Belgian Chocolate Fudge Cake',
    verified: true,
    comment: 'The Belgian Chocolate Fudge Cake was absolutely out of this world! Rich, moist, and not overly sweet. Delivered right on time for my birthday party. Everyone asked where I bought it from!'
  },
  {
    id: '2',
    name: 'Hamza Malik',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    date: '1 week ago',
    product: 'Pink Glazed Donut & Croissants',
    verified: true,
    comment: 'Sweet Crumbs is my go-to morning spot now. Their croissants are so flaky and buttered to perfection. The pink glazed donuts bring back sweet childhood memories!'
  },
  {
    id: '3',
    name: 'Sara Ahmed',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    date: '2 weeks ago',
    product: 'Vanilla Confetti Cupcake',
    verified: true,
    comment: 'Lightest cupcake batter I have ever tasted! The buttercream frosting is velvety soft. Packaging was pristine and super cute.'
  },
  {
    id: '4',
    name: 'Zainab Fatima',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
    rating: 4,
    date: '3 weeks ago',
    product: 'Classic Strawberry Sundae',
    verified: true,
    comment: 'Very tasty ice cream sundae with real strawberry slices. Loved the fresh compote. Will definitely reorder soon.'
  }
];

function timeAgo(dateString) {
  if (!dateString) return 'Just now';
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  const intervals = [
    { label: 'year', secs: 31536000 },
    { label: 'month', secs: 2592000 },
    { label: 'week', secs: 604800 },
    { label: 'day', secs: 86400 },
    { label: 'hour', secs: 3600 },
    { label: 'minute', secs: 60 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.secs);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'Just now';
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(initialReviews); // fake reviews start se hi
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // API se real reviews lao, lekin fake reviews remove mat karo
  useEffect(() => {
    API.get('/reviews')
      .then((res) => {
        const apiReviews = res.data || [];

        // API reviews ko upar add karo, fake reviews neeche reh jayenge
        setReviews((prev) => {
          // duplicate avoid karne ke liye (agar same id aaye)
          const existingIds = new Set(prev.map((r) => r.id || r._id));
          const uniqueApi = apiReviews.filter(
            (r) => !existingIds.has(r._id) && !existingIds.has(r.id)
          );
          return [...uniqueApi, ...prev];
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false); // error aaye to bhi fake reviews dikhte rahenge
      });
  }, []);

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === '5star') return r.rating === 5;
    if (selectedFilter === '4star') return r.rating === 4;
    return true;
  });

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const starBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { label: `${star} Star${star > 1 ? 's' : ''}`, pct, count };
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!newName.trim() || !newComment.trim()) return;

    setSubmitting(true);

    API.post('/reviews', {
      name: newName,
      product: newProduct || 'Specialty Dessert',
      rating: newRating,
      comment: newComment,
    })
      .then((res) => {
        // API se aaya hua review upar add kar do
        setReviews((prev) => [res.data, ...prev]);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setIsModalOpen(false);
          setNewName('');
          setNewComment('');
          setNewProduct('');
          setNewRating(5);
        }, 1800);
      })
      .catch((err) => {
        setFormError(err.response?.data?.message || 'Could not submit review');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Real Smiles & Honest Thoughts</span>
          <h2 className={styles.title}>Customer Reviews</h2>
          <p className={styles.subtitle}>
            Discover why dessert lovers across town trust Sweet Crumbs for their sweetest moments.
          </p>
        </div>

        <div className={styles.ratingSummaryCard}>
          <div className={styles.summaryLeft}>
            <div className={styles.bigScore}>{avgRating}</div>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.totalText}>
              Based on {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className={styles.barsContainer}>
            {starBreakdown.map((b, i) => (
              <div key={i} className={styles.barRow}>
                <span className={styles.barLabel}>{b.label}</span>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${b.pct}%` }}></div>
                </div>
                <span className={styles.barCount}>{b.count}</span>
              </div>
            ))}
          </div>

          <div className={styles.summaryRight}>
            <button className={styles.writeBtn} onClick={() => setIsModalOpen(true)}>
              <span>✍️</span> Leave a Review
            </button>
          </div>
        </div>

        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${selectedFilter === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            className={`${styles.filterBtn} ${selectedFilter === '5star' ? styles.active : ''}`}
            onClick={() => setSelectedFilter('5star')}
          >
            5 Stars Only ★★★★★
          </button>
          <button
            className={`${styles.filterBtn} ${selectedFilter === '4star' ? styles.active : ''}`}
            onClick={() => setSelectedFilter('4star')}
          >
            4 Stars ★★★★☆
          </button>
        </div>

        {loading && <p className={styles.statusText}>Loading reviews...</p>}

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((r) => (
              <motion.div
                key={r._id || r.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <img
                    src={
                      r.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=FF7FB4&color=fff`
                    }
                    alt={r.name}
                    className={styles.avatar}
                  />
                  <div className={styles.userMeta}>
                    <div className={styles.userNameRow}>
                      <span className={styles.userName}>{r.name}</span>
                      {r.verified && (
                        <span className={styles.verifiedBadge}>✓ Verified Buyer</span>
                      )}
                    </div>
                    <span className={styles.date}>
                      {r.date ? r.date : timeAgo(r.createdAt)}
                    </span>
                  </div>
                </div>

                <div className={styles.cardRating}>
                  {'★'.repeat(r.rating)}
                  {'☆'.repeat(5 - r.rating)}
                </div>

                <p className={styles.comment}>{r.comment}</p>

                <div className={styles.productBadge}>
                  <span>Item:</span> {r.product}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
              ✕
            </button>

            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✨</div>
                <h3>Thank You!</h3>
                <p>Your review has been submitted successfully and published.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className={styles.form}>
                <h3>Write Your Review</h3>
                <p className={styles.formSubtitle}>
                  Share your Sweet Crumbs experience with fellow bakery lovers!
                </p>

                {formError && <p className={styles.formError}>{formError}</p>}

                <div className={styles.formGroup}>
                  <label>Overall Rating</label>
                  <div className={styles.starPicker}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`${styles.starBtn} ${newRating >= star ? styles.starActive : ''}`}
                        onClick={() => setNewRating(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sana Riaz"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Treat Purchased</label>
                  <input
                    type="text"
                    placeholder="e.g. Chocolate Fudge Cake, Glazed Donuts..."
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Your Feedback</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us what you loved about the taste, texture, or delivery service..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit My Review'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}