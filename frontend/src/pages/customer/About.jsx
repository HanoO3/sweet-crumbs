import styles from './StaticPage.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Our Story</span>
        <h1 className={styles.title}>About Sweet Crumbs</h1>
        <p className={styles.text}>
          Sweet Crumbs started as a small home kitchen with one mission: bring
          real, handcrafted baking back to everyday life. No preservatives, no
          shortcuts — just butter, sugar, flour, and care.
        </p>
        <p className={styles.text}>
          Every cake, pastry, and sweet on this menu is made fresh in small
          batches, using recipes perfected over years of practice. We believe
          good food brings people together, one bite at a time.
        </p>
      </div>
    </div>
  );
}