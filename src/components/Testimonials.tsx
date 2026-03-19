import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    text: "A instalação das câmeras de segurança foi impecável. Consigo monitorar minha loja pelo celular em tempo real, com uma qualidade de imagem impressionante.",
    author: "Ricardo Almeida",
    role: "Proprietário de Comércio"
  },
  {
    id: 2,
    text: "Colocamos o controle de acesso facial no nosso condomínio e a diferença é gritante. Fim das chaves perdidas e segurança dobrada na portaria! A página me convenceu e o serviço entregou o que prometeu.",
    author: "Fernanda Costa",
    role: "Síndica Profissional"
  },
  {
    id: 3,
    text: "O projeto de redes e a central de alarme salvaram nossa operação. Instalação rápida, limpa e o sistema funciona perfeitamente. Excelente investimento para minha casa e escritório.",
    author: "Carlos Mendes",
    role: "Morador e Empreendedor"
  }
];

export function Testimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.sectionTitle}>O que nossos <span className="highlight">clientes dizem</span></h2>
        <div className={styles.grid}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.text}>"{item.text}"</p>
              <div className={styles.authorGroup}>
                <div className={styles.avatar}>{item.author.charAt(0)}</div>
                <div>
                  <h4 className={styles.author}>{item.author}</h4>
                  <p className={styles.role}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
