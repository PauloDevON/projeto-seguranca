import styles from './Hero.module.css';
import { HeroCarousel } from './HeroCarousel';

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <HeroCarousel />
      <div className={styles.heroOverlay}></div>
      <div className={`container ${styles.heroContent}`} style={{ position: 'relative', zIndex: 1 }}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            Sua <span className={styles.highlight}>Segurança</span>, <br />
            Nosso Compromisso
          </h1>
          <p className={styles.subtitle}>
            Tecnologia de ponta para proteger o que é mais importante para você. 
            Câmeras, alarmes, controle de acesso e redes estruturadas com instalação especializada.
          </p>
          <a href="#contato" className={styles.ctaButton}>Solicitar Orçamento Especialista</a>
        </div>
        
        {/* O HeroCarousel agora atua como um immersive background banner! */}
      </div>
    </section>
  );
}
