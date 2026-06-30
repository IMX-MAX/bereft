"use client";
import styles from '../Settings.module.css';
import Link from 'next/link';

export default function Billing() {
  return (
    <>
      <h1 className={styles.pageTitle}>Billing & plans</h1>
      <p className={styles.pageSubtitle}>Manage your subscription and billing details.</p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Current plan</div>
        <div className={styles.card}>
          <div className={styles.planHeader}>
            <div>
              <div className={styles.planName}>Pro plan</div>
              <div className={styles.planPrice}><span>$29</span> / month</div>
            </div>
            <div className={styles.planActions}>
              <button className="btn-secondary">Cancel subscription</button>
              <button className="btn-primary">Change plan</button>
            </div>
          </div>
          
          <div className={styles.usageSection}>
            <div className={styles.usageHeader}>
              <span>Credits usage (resets Jul 1)</span>
              <span className={styles.usageValue}>1,024 / 2,000 used</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Payment method</div>
        <div className={styles.card}>
          <div className={styles.paymentRow}>
            <div className={styles.cardInfo}>
              <div className={styles.cardIcon}>VISA</div>
              <div>Visa ending in 4242</div>
            </div>
            <button className="btn-secondary">Update</button>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Billing history</div>
        <div className={styles.card} style={{padding: '0 24px'}}>
          <div className={styles.historyList}>
            <div className={styles.historyItem}>
              <div className={styles.historyDate}>Jun 1, 2026</div>
              <div className={styles.historyDesc}>Pro plan — Monthly</div>
              <div className={styles.historyAmount}>$29.00</div>
              <div className={styles.historyLink}><Link href="#">Download</Link></div>
            </div>
            <div className={styles.historyItem}>
              <div className={styles.historyDate}>May 1, 2026</div>
              <div className={styles.historyDesc}>Pro plan — Monthly</div>
              <div className={styles.historyAmount}>$29.00</div>
              <div className={styles.historyLink}><Link href="#">Download</Link></div>
            </div>
            <div className={styles.historyItem}>
              <div className={styles.historyDate}>Apr 1, 2026</div>
              <div className={styles.historyDesc}>Pro plan — Monthly</div>
              <div className={styles.historyAmount}>$29.00</div>
              <div className={styles.historyLink}><Link href="#">Download</Link></div>
            </div>
            <div className={styles.historyItem}>
              <div className={styles.historyDate}>Mar 1, 2026</div>
              <div className={styles.historyDesc}>Pro plan — Monthly</div>
              <div className={styles.historyAmount}>$29.00</div>
              <div className={styles.historyLink}><Link href="#">Download</Link></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
