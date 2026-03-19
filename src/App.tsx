import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Brands } from './components/Brands';
import { TargetAudience } from './components/TargetAudience';
import { Solutions } from './components/Solutions';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { BackgroundSilhouettes } from './components/BackgroundSilhouettes';
import './App.css';

function App() {
  return (
    <div className="appContainer">
      <BackgroundSilhouettes />
      <Header />
      <main>
        <Hero />
        <Brands />
        <TargetAudience />
        <Solutions />
        <Testimonials />
        
        <section id="contato" className="contactSection">
          <div className="container contactLayout">
            <div className="contactInfo">
              <h2 className="contactTitle">A tranquilidade que sua família e seu negócio <span className="highlight">merecem.</span></h2>
              <p className="contactDesc">
                Em um mundo cada vez mais desafiador, agir preventivamente não é luxo, é <strong>necessidade absoluta</strong>. Não espere o pior acontecer para buscar uma solução. Ao contar com a Projeto Segurança, você elimina pontos cegos, inibe agressões externas e eleva a segurança do seu patrimônio ao nível tecnológico corporativo.
              </p>
              <p className="contactDesc" style={{ fontSize: '1.05rem', color: '#fff', marginTop: '-1rem' }}>
                Deixe nossa equipe de especialistas desenhar um projeto <strong>100% blindado</strong> e personalizado para a sua realidade. Preencha o formulário e receba um diagnóstico técnico sem compromisso hoje mesmo.
              </p>
              
              <div className="benefitsBox">
                <div className="benefitItem">
                  <div className="benefitIcon">✓</div>
                  <span>Visita técnica minuciosa</span>
                </div>
                <div className="benefitItem">
                  <div className="benefitIcon">✓</div>
                  <span>Equipamentos de última geração</span>
                </div>
                <div className="benefitItem">
                  <div className="benefitIcon">✓</div>
                  <span>Instalação padrão corporativo</span>
                </div>
              </div>
            </div>
            
            <div className="formWrapper">
              <ContactForm onSubmitSuccess={() => alert('Solicitação enviada com sucesso!')} />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Projeto Segurança. Sua segurança, nosso compromisso.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
