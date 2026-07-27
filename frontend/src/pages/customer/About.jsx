import { Link } from 'react-router-dom';
import styles from './StaticPage.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Ovens Hot, Hearts Warm</span>
          <h1 className={styles.title}>Our Bakery Story</h1>
          <p className={styles.subtitle}>
            Crafting memorable sweetness from natural, wholesome ingredients since day one.
          </p>
        </div>

        <div className={styles.storyGrid}>
          <div className={styles.storyCard}>
            <div className={styles.storyImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop"
                alt="Baking Fresh Croissants"
                className={styles.storyImg}
              />
            </div>
            <div className={styles.storyContent}>
              <h3>Fresh Small-Batch Baking</h3>
              <p>
                Sweet Crumbs started as a small artisan kitchen with one core belief: real baking takes time, passion, and top-tier ingredients. We don't believe in chemical preservatives or artificial short-cuts.
              </p>
            </div>
          </div>

          <div className={styles.storyCardAlt}>
            <div className={styles.storyContent}>
              <h3>Pure Premium Ingredients</h3>
              <p>
                From rich French butter and organic flour to pure Belgian cocoa and fresh local strawberries, every doughnut, cupcake, and cake on our menu is baked with love every single morning.
              </p>
            </div>
            <div className={styles.storyImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"
                alt="Belgian Fudge Cake"
                className={styles.storyImg}
              />
            </div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <h2>10,000+</h2>
            <p>Happy Cake Lovers</p>
          </div>
          <div className={styles.statBox}>
            <h2>100%</h2>
            <p>Fresh & Organic</p>
          </div>
          <div className={styles.statBox}>
            <h2>4.9 ★</h2>
            <p>Average Rating</p>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <h2>Ready to taste the magic?</h2>
          <Link to="/products" className={styles.ctaBtn}>
            Explore Our Delicacies Menu 🍩
          </Link>
        </div>
      </div>
    </div>
  );
}