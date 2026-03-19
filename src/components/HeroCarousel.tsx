import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroCarousel.module.css';

const slides = [
  {
    id: 1,
    image: '/images/camera.png',
    title: 'Monitoramento Contínuo',
    desc: 'Câmeras ativas acompanhando tudo direto na tela do seu celular.'
  },
  {
    id: 2,
    image: '/images/access.png',
    title: 'Acesso Facial Inteligente',
    desc: 'Sua biometria abrindo portas em condomínios de forma impecável.'
  },
  {
    id: 3,
    image: '/images/router.png',
    title: 'Wi-Fi 6 de Alta Performance',
    desc: 'Roteadores de ponta espalhando internet pura por toda a casa.'
  },
  {
    id: 4,
    image: '/images/alarm.png',
    title: 'Sistema Antifurto',
    desc: 'Alarmes impenetráveis acionados remotamente para salvaguardar bens.'
  },
  {
    id: 5,
    image: '/images/intercom.png',
    title: 'Guarita Holográfica',
    desc: 'Interfones digitais com vídeo monitorando fluxos de portaria.'
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 7 segundos de transição conforme solicitado
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className={styles.carouselContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={styles.slide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <img src={slides[currentIndex].image} alt={slides[currentIndex].title} className={styles.slideImage} />
          </motion.div>
        </AnimatePresence>
        
        {/* Efeito global extra de destroços CSS / particles */}
        <div className={styles.debrisOverlay}></div>
      </div>

      {/* Slogan Text Overlay conectado ao Carousel (Aparece ao lado do Slogan Principal) */}
      <div className={styles.dynamicTextOverlay}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className={styles.dynamicTextBox}
          >
            <div className={styles.accentLine}></div>
            <h3 className={styles.dynamicTitle}>{slides[currentIndex].title}</h3>
            <p className={styles.dynamicDesc}>{slides[currentIndex].desc}</p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.indicators}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.indicator} ${idx === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para a imagem ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
