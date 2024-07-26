import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormComponent from '../FormComponent';

test('renders form with all fields', () => {
  render(<FormComponent />);
  expect(screen.getByPlaceholderText(/Digite seu nome/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Digite o nome do filme/i)).toBeInTheDocument();
  expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
});

test('validates required fields', async () => {
  render(<FormComponent />);
  fireEvent.click(screen.getByText(/Buscar/i));
  await waitFor(() => {
    expect(screen.getByText(/Nome e nome do filme são obrigatórios./i)).toBeInTheDocument();
  });
});

test('submits form with valid data', async () => {
  render(<FormComponent />);
  fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'João' } });
  fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'O Grande Filme' } });
  fireEvent.click(screen.getByText(/Buscar/i));
  await waitFor(() => {
    // Verifique se o indicador de carregamento aparece
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });
  // Aguarde a remoção do indicador de carregamento
  await waitFor(() => {
    expect(screen.queryByText(/Carregando.../i)).not.toBeInTheDocument();
  }, { timeout: 3000 }); // Ajuste o tempo limite conforme necessário
});

test('shows loading indicator on submit', async () => {
  render(<FormComponent />);
  fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'João' } });
  fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'O Grande Filme' } });
  fireEvent.click(screen.getByText(/Buscar/i));
  
  // Adicione uma pequena espera para garantir que o indicador de carregamento seja exibido
  await waitFor(() => {
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  // Verifique se o indicador de carregamento desaparece após o tempo de carregamento
  await waitFor(() => {
    expect(screen.queryByText(/Carregando.../i)).not.toBeInTheDocument();
  }, { timeout: 3000 }); // Ajuste o tempo limite conforme necessário
});

test('shows error message for empty name field', async () => {
  render(<FormComponent />);
  fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'O Grande Filme' } });
  fireEvent.click(screen.getByText(/Buscar/i));
  await waitFor(() => {
    expect(screen.getByText(/Nome e nome do filme são obrigatórios./i)).toBeInTheDocument();
  });
});

test('shows error message for empty movie field', async () => {
  render(<FormComponent />);
  fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'João' } });
  fireEvent.click(screen.getByText(/Buscar/i));
  await waitFor(() => {
    expect(screen.getByText(/Nome e nome do filme são obrigatórios./i)).toBeInTheDocument();
  });
});

// Mock da função para simular erro na requisição
globalThis.originalPromise = globalThis.Promise;
globalThis.Promise = jest.fn().mockImplementation((executor) => {
  return new Promise((resolve, reject) => {
    // Simular erro
    reject(new Error('Network Error'));
  });
});

test('handles request failure', async () => {
  render(<FormComponent />);

  fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'João' } });
  fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'O Grande Filme' } });

  fireEvent.click(screen.getByText(/Buscar/i));

  // Espera pela mensagem de erro
  await waitFor(() => {
    expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
  });
});

// Restaurar o Promise original após o teste
afterAll(() => {
  globalThis.Promise = globalThis.originalPromise;
});
test('disables submit button while loading', async () => {
  render(<FormComponent />);
  fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'João' } });
  fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'O Grande Filme' } });

  fireEvent.click(screen.getByText(/Buscar/i));

  // Verifique se o botão está desativado durante o carregamento
  expect(screen.getByText(/Buscar/i)).toBeDisabled();

  // Simula a espera de 2 segundos para a requisição
  await waitFor(() => {
    expect(screen.getByText(/Buscar/i)).not.toBeDisabled();
  }, { timeout: 3000 }); // Ajuste o tempo limite conforme necessário
});

test('applies CSS classes correctly', () => {
  render(<FormComponent />);
  expect(screen.getByTestId('form-component')).toHaveClass('form-component');
});

