import { ShieldCheck } from 'lucide-react';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className={styles.logoInfo}
          title="Voltar ao início"
        >
          <div className={styles.logo}>
            <ShieldCheck size={26} className={styles.logoIcon} />
            Projeto Segurança
          </div>
          <span className={styles.slogan}>Sua segurança, nosso compromisso</span>
        </a>
        <nav className={styles.nav}>
          <a href="#solucoes">Soluções</a>
          <a href="#contato" className={styles.btnNav}>Fale Conosco</a>
        </nav>
      </div>
    </header>
  );
}
