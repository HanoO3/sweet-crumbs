import { useState } from 'react';
import styles from './StaticPage.module.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>We'd Love to Hear From You</span>
          <h1 className={styles.title}>Get In Touch</h1>
          <p className={styles.subtitle}>
            Have a custom cake inquiry, feedback, or event catering question? Send us a message!
          </p>
        </div>

        <div className={styles.contactLayout}>
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successState}>
                <span className={styles.successIcon}>💌</span>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Our head baker will respond within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Send Us a Message</h3>
                <div className={styles.field}>
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sara Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. sara@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label>Your Message / Cake Inquiry</label>
                  <textarea
                    rows="5"
                    placeholder="Tell us about your event date, cake size, preferred flavor..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.sendBtn}>
                  Send Message 🧁
                </button>
              </form>
            )}
          </div>

          <div className={styles.infoCard}>
            <h3>Kitchen & Store Details</h3>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <div>
                  <strong>Store Location</strong>
                  <p>42 Baker Street, Pastry District</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📞</span>
                <div>
                  <strong>Phone & WhatsApp</strong>
                  <p>+92 300 555-CRUMB</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>✉️</span>
                <div>
                  <strong>Email Inquiries</strong>
                  <p>hello@sweetcrumbsbakery.com</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>⏰</span>
                <div>
                  <strong>Opening Hours</strong>
                  <p>Mon - Sat: 8 AM - 10 PM<br />Sun: 9 AM - 9 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}