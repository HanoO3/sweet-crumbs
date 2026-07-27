import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CustomerReviews.module.css';

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

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('Specialty Dessert');
  const [submitted, setSubmitted] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === '5star') return r.rating === 5;
    if (selectedFilter === '4star') return r.rating === 4;
    return true;
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev = {
      id: Date.now().toString(),
      name: newName,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=FF7FB4&color=fff`,
      rating: newRating,
      date: 'Just now',
      product: newProduct,
      verified: true,
      comment: newComment
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewName('');
      setNewComment('');
      setNewRating(5);
    }, 1800);
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
            <div className={styles.bigScore}>4.9</div>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.totalText}>Based on 340+ Verified Reviews</p>
          </div>

          <div className={styles.barsContainer}>
            {[
              { label: '5 Stars', pct: 92, count: 312 },
              { label: '4 Stars', pct: 6, count: 20 },
              { label: '3 Stars', pct: 2, count: 6 },
              { label: '2 Stars', pct: 0, count: 0 },
              { label: '1 Star', pct: 0, count: 0 }
            ].map((b, i) => (
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

        {/* Filter Pills */}
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

        {/* Reviews Grid */}
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <img src={r.avatar} alt={r.name} className={styles.avatar} />
                  <div className={styles.userMeta}>
                    <div className={styles.userNameRow}>
                      <span className={styles.userName}>{r.name}</span>
                      {r.verified && <span className={styles.verifiedBadge}>✓ Verified Buyer</span>}
                    </div>
                    <span className={styles.date}>{r.date}</span>
                  </div>
                </div>

                <div className={styles.cardRating}>
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
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

      {/* Review Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>✕</button>

            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✨</div>
                <h3>Thank You!</h3>
                <p>Your review has been submitted successfully and published.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className={styles.form}>
                <h3>Write Your Review</h3>
                <p className={styles.formSubtitle}>Share your Sweet Crumbs experience with fellow bakery lovers!</p>

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

                <button type="submit" className={styles.submitBtn}>
                  Submit My Review
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
