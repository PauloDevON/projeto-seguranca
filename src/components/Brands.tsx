import styles from './Brands.module.css';

export function Brands() {
  return (
    <section className={styles.brandsSection}>
      <div className={`container ${styles.brandsContainer}`}>
        <p className={styles.brandsText}>Tecnologia premium com parceiros oficiais</p>
        <div className={styles.brandLogos}>
          {/* Usaríamos SVGs oficiais na versão final */}
          <div className={`${styles.brand} ${styles.brandIntelbras}`}>INTELBRAS</div>
          <div className={styles.divider}></div>
          <div className={`${styles.brand} ${styles.brandHikvision}`}>HIKVISION</div>
        </div>
      </div>
    </section>
  );
}
