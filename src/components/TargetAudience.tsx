import { Home, Briefcase, Building2 } from 'lucide-react';
import styles from './TargetAudience.module.css';

const audiences = [
  {
    id: 1,
    title: 'Residências',
    icon: <Home size={48} />,
    desc: 'Monitoramento contínuo e automação inteligente para proteger sua família, seu patrimônio e garantir a paz no seu lar 24 horas por dia.'
  },
  {
    id: 2,
    title: 'Empresas',
    icon: <Briefcase size={48} />,
    desc: 'Sistemas de segurança corporativa de ponta contra invasões, prezando pela proteção de colaboradores, dados e equipamentos.'
  },
  {
    id: 3,
    title: 'Condomínios',
    icon: <Building2 size={48} />,
    desc: 'Controle de acesso rigoroso acoplado a um monitoramento de fluxo contínuo para manter a tranquilidade absoluta dos moradores.'
  }
];

export function TargetAudience() {
  return (
    <section className={styles.audienceSection}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.sectionTitle}>
          Especialistas em segurança para <span className="highlight">qualquer ambiente</span>
        </h2>
        <p className={styles.sectionDesc}>
          Não importa a complexidade do cenário, nós desenvolvemos projetos robustos e sob medida.
        </p>
        
        <div className={styles.grid}>
          {audiences.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
