import React, { useState, useEffect } from 'react';
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
    
    // Success
    console.log('Submitting data:', data);
    if (onSubmitSuccess) onSubmitSuccess();
    
    // Form will not reset on success automatically to show success state typically,
    // but we can reset per requirement
    reset();
    setChallenge(generateAntiBotChallenge());
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>Solicite um Orçamento Especialista</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="nome">Nome Completo</label>
        <input id="nome" type="text" {...register("nome", { required: "Nome é obrigatório" })} />
        {errors.nome && <span className={styles.errorText}>{errors.nome.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="telefone">Telefone</label>
        <input id="telefone" type="text" {...register("telefone", { required: "Telefone é obrigatório" })} />
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
          <option value="Cameras">Câmeras (CFTV)</option>
          <option value="Alarme">Alarme</option>
          <option value="Acesso">Controle de Acesso Facial</option>
          <option value="Interfonia">Interfonia</option>
          <option value="Redes">Redes</option>
        </select>
        {errors.tipoSolucao && <span className={styles.errorText}>{errors.tipoSolucao.message}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="descricao">Descrição do Problema</label>
        <textarea id="descricao" rows={4} {...register("descricao")} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="dataCompra">Data esperada da Compra</label>
        <input id="dataCompra" type="date" {...register("dataCompra")} />
      </div>

      {challenge && (
        <div className={styles.antiBotGroup}>
          <p data-testid="antibot-question" className={styles.antibotText}>Confirme que é humano. Quanto é {challenge.num1} + {challenge.num2}?</p>
          <label htmlFor="antibot">Resultado</label>
          <input id="antibot" type="number" {...register("antibot", { required: "A resposta é obrigatória" })} />
          {errors.antibot && <span className={styles.errorText}>{errors.antibot.message}</span>}
        </div>
      )}

      <button type="submit" className={styles.submitButton}>Enviar Solicitação</button>
    </form>
  );
}
