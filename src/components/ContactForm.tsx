import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type AntiBotChallenge, generateAntiBotChallenge, validateAntiBotAnswer } from '../utils/antiBot.ts';
import { isValidPhone } from '../utils/validation.ts';
import styles from './ContactForm.module.css';

type FormData = {
  nome: string;
  telefone: string;
  email: string;
  tipoSolucao: string;
  descricao: string;
  dataCompra: string;
  comoEncontrou: string;
  antibot: string;
};

type Props = {
  onSubmitSuccess?: () => void;
};

export function ContactForm({ onSubmitSuccess }: Props) {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<FormData>();
  const [challenge, setChallenge] = useState<AntiBotChallenge | null>(null);

  useEffect(() => {
    setChallenge(generateAntiBotChallenge());
  }, []);

  const onSubmit = (data: FormData) => {
    if (!challenge) return;
    
    // Validate custom phone
    if (!isValidPhone(data.telefone)) {
      setError('telefone', { type: 'manual', message: 'Telefone inválido' });
      return;
    }

    // Validate anti-bot
    const isBotValid = validateAntiBotAnswer(challenge, parseInt(data.antibot));
    if (!isBotValid) {
      setError('antibot', { type: 'manual', message: 'Resposta incorreta' });
      return;
    }
    
    // Prepare data for Netlify Forms
    const formData = new URLSearchParams();
    formData.append("form-name", "contact");
    formData.append("nome", data.nome);
    formData.append("telefone", data.telefone);
    formData.append("email", data.email);
    formData.append("tipoSolucao", data.tipoSolucao);
    formData.append("descricao", data.descricao || '');
    formData.append("dataCompra", data.dataCompra || '');
    formData.append("comoEncontrou", data.comoEncontrou || '');

    // Submit via AJAX so the page doesn't reload
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    })
      .then(() => {
         if (onSubmitSuccess) onSubmitSuccess();
         reset();
         setChallenge(generateAntiBotChallenge());
         alert('Enviado com sucesso! Nossos especialistas entrarão em contato em breve.');
      })
      .catch((error) => {
         console.error('Error:', error);
         alert('Erro de conexão ao enviar o formulário.');
      });
  };

  return (
    <form name="contact" data-netlify="true" className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="form-name" value="contact" />
      <h2 className={styles.formTitle}>Solicite um Orçamento Especialista</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="nome">Nome Completo</label>
        <input id="nome" type="text" {...register("nome", { required: "Nome é obrigatório" })} />
        {errors.nome && <span className={styles.errorText}>{errors.nome.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="telefone">Telefone</label>
        <input 
          id="telefone" 
          type="text" 
          maxLength={15}
          placeholder="(11) 99999-9999"
          {...register("telefone", { 
            required: "Telefone é obrigatório",
            onChange: (e) => {
              let v = e.target.value.replace(/\D/g, '');
              if (v.length > 11) v = v.substring(0, 11);
              if (v.length >= 7) {
                v = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
              } else if (v.length >= 3) {
                v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
              }
              e.target.value = v;
            }
          })} 
        />
        {errors.telefone && <span className={styles.errorText}>{errors.telefone.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" {...register("email", { 
          required: "E-mail é obrigatório",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } 
        })} />
        {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="tipoSolucao">Tipo de Solução</label>
        <select id="tipoSolucao" {...register("tipoSolucao", { required: "Selecione uma opção" })}>
          <option value="">Selecione...</option>
          <option value="Cameras">Câmeras de Segurança</option>
          <option value="Alarme">Sistemas de Alarme e Cerca Elétrica</option>
          <option value="Acesso">Controle de Acesso Facial</option>
          <option value="Redes">Redes Estruturadas</option>
          <option value="CasaInteligente">Casa Inteligente</option>
          <option value="Interfonia">Interfonia</option>
        </select>
        {errors.tipoSolucao && <span className={styles.errorText}>{errors.tipoSolucao.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="descricao">Descrição do Problema</label>
        <textarea id="descricao" rows={4} {...register("descricao")} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="comoEncontrou">Como nos encontrou?</label>
        <select id="comoEncontrou" {...register("comoEncontrou")}>
          <option value="">Selecione...</option>
          <option value="Google">Google</option>
          <option value="Youtube">YouTube</option>
          <option value="Whatsapp">WhatsApp</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Linkedin">LinkedIn</option>
          <option value="Tiktok">TikTok</option>
          <option value="Indicação">Indicação</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="dataCompra">Data esperada da Compra (DD/MM/AAAA)</label>
        <input 
          id="dataCompra" 
          type="text" 
          placeholder="DD/MM/AAAA" 
          maxLength={10}
          {...register("dataCompra", {
             onChange: (e) => {
               let v = e.target.value.replace(/\D/g, '');
               if (v.length >= 5) {
                 v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4, 8)}`;
               } else if (v.length >= 3) {
                 v = `${v.slice(0, 2)}/${v.slice(2)}`;
               }
               e.target.value = v;
             }
          })} 
        />
      </div>

      {challenge && (
        <div className={styles.antiBotGroup}>
          <p data-testid="antibot-question" className={styles.antibotText}>Confirme que é humano. Quanto é {challenge.num1} + {challenge.num2}?</p>
          <div className={styles.antiBotRow}>
            <label htmlFor="antibot">Resultado</label>
            <input id="antibot" type="number" className={styles.antiBotInput} {...register("antibot", { required: "A resposta é obrigatória" })} />
          </div>
          {errors.antibot && <span className={styles.errorText}>{errors.antibot.message}</span>}
        </div>
      )}

      <button type="submit" className={styles.submitButton}>Enviar Solicitação</button>
    </form>
  );
}
