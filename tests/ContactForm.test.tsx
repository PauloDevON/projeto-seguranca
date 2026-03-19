import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ContactForm } from '../src/components/ContactForm';
import '@testing-library/jest-dom';

describe('ContactForm Integration', () => {
  it('deve renderizar o formulário', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
  });

  it('deve exibir erros de validação ao enviar formulário vazio', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/E-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/Telefone é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/A resposta é obrigatória/i)).toBeInTheDocument();
    });
  });

  it('deve submeter o formulário se preenchido corretamente', async () => {
    const mockOnSubmit = vi.fn();
    render(<ContactForm onSubmitSuccess={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: '(11) 98765-4321' } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'joao@teste.com' } });
    fireEvent.change(screen.getByLabelText(/Tipo de Solução/i), { target: { value: 'Cameras' } });
    fireEvent.change(screen.getByLabelText(/Descrição do Problema/i), { target: { value: 'Preciso de novas câmeras.' } });
    
    const questionElement = screen.getByTestId('antibot-question');
    const questionText = questionElement.textContent || '';
    const match = questionText.match(/(\d+)\s*\+\s*(\d+)/);
    if (match) {
        const sum = parseInt(match[1]) + parseInt(match[2]);
        fireEvent.change(screen.getByLabelText(/Resultado/i), { target: { value: sum.toString() } });
    }

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
