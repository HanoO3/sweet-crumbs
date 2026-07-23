import { useState } from 'react';
import styles from './StaticPage.module.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Get in Touch</span>
        <h1 className={styles.title}>Contact Us</h1>

        {submitted ? (
          <p className={styles.text}>
            Thanks for reaching out! We'll get back to you soon.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" rows="5" required />
            <button type="submit">Send Message</button>
          </form>
        )}

        <div className={styles.info}>
          <p>📍 Bahawalpur, Pakistan</p>
          <p>📞 +92 300 1234567</p>
          <p>✉️ hello@sweetcrumbs.com</p>
        </div>
      </div>
    </div>
  );
}