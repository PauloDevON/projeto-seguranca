import { Camera, ShieldAlert, Fingerprint, Router, Smartphone, PhoneCall } from 'lucide-react';
import styles from './Solutions.module.css';

const solutions = [
  {
    id: 1,
    title: 'Câmeras de Segurança',
    desc: 'Monitoramento contínuo em ultra-resolução com acesso remoto vivo via aplicativo celular.',
    icon: <Camera size={32} />
  },
  {
    id: 2,
    title: 'Sistemas de Alarme e Cerca elétrica',
    desc: 'Detecção imediata de intrusão com barreiras ativas para inibir tentativas de acesso não autorizado.',
    icon: <ShieldAlert size={32} />
  },
  {
    id: 3,
    title: 'Controle de acesso Facial',
    desc: 'Biometria avançada para liberação rápida e 100% segura de moradores e colaboradores credenciados.',
    icon: <Fingerprint size={32} />
  },
  {
    id: 4,
    title: 'Redes Estruturadas',
    desc: 'Infraestrutura de alta capacidade de dados para conectar equipamentos pesados e eliminar pontos cegos.',
    icon: <Router size={32} />
  },
  {
    id: 5,
    title: 'Casa Inteligente',
    desc: 'Automação residencial robusta unindo conforto climático, iluminação dinâmica e forte segurança unificada.',
    icon: <Smartphone size={32} />
  },
  {
    id: 6,
    title: 'Interfonia',
    desc: 'Comunicação viva, clara e de alto alcance entre guaritas e residências em cenários variados.',
    icon: <PhoneCall size={32} />
  }
];

export function Solutions() {
  return (
    <section id="solucoes" className={styles.solutionsSection}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.sectionTitle}>Nossas <span className="highlight">Soluções</span></h2>
        
        <div className={styles.grid}>
          {solutions.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
