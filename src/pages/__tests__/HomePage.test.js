import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';
import { submitQuery } from '../../api';

// Mock da função submitQuery
jest.mock('../../api', () => ({
  submitQuery: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders HomePage with heading and button', () => {
    render(<HomePage />);
    const headingElement = screen.getByText(/Bem-vindo à Aplicação de Filmes/i);
    const buttonElement = screen.getByText(/Buscar Filme/i);

    expect(headingElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('button click logs message', async () => {
    submitQuery.mockResolvedValue({ message: 'Mocked data' });

    render(<HomePage />);
    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    const movieInput = screen.getByPlaceholderText(/Digite o nome do filme/i);
    const buttonElement = screen.getByText(/Buscar Filme/i);

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(movieInput, { target: { value: 'Inception' } });
    fireEvent.click(buttonElement);

    await waitFor(() => expect(screen.getByText(/Mocked data/i)).toBeInTheDocument());
  });

  test('displays error message on API call failure', async () => {
    submitQuery.mockRejectedValue(new Error('API Error'));

    render(<HomePage />);
    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    const movieInput = screen.getByPlaceholderText(/Digite o nome do filme/i);
    const buttonElement = screen.getByText(/Buscar Filme/i);

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(movieInput, { target: { value: 'Inception' } });
    fireEvent.click(buttonElement);

    await waitFor(() => expect(screen.getByText(/Erro ao buscar dados. Tente novamente mais tarde./i)).toBeInTheDocument());
  });

  test('displays loading indicator while fetching data', async () => {
    render(<HomePage />);

    // Simula a resposta da API
    submitQuery.mockResolvedValueOnce({ message: 'Mocked data' });

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });
    fireEvent.click(screen.getByText(/Buscar Filme/i));

    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/Carregando.../i)).not.toBeInTheDocument());
  });

  test('displays error message when fields are empty and form is submitted', async () => {
    render(<HomePage />);

    const buttonElement = screen.getByText(/Buscar Filme/i);
    fireEvent.click(buttonElement);

    await screen.findByText(/Por favor, preencha todos os campos./i);
  });

  test('form does not submit when fields are empty', async () => {
    submitQuery.mockClear();

    render(<HomePage />);

    const buttonElement = screen.getByText(/Buscar Filme/i);
    fireEvent.click(buttonElement);

    // Verifica se a função submitQuery não foi chamada
    expect(submitQuery).not.toHaveBeenCalled();

    // Verifica se a mensagem de erro é exibida
    await waitFor(() => {
      expect(screen.getByText(/Por favor, preencha todos os campos./i)).toBeInTheDocument();
    });
  });

  test('displays error message when fields are empty and form is submitted', async () => {
    submitQuery.mockClear();

    render(<HomePage />);

    const buttonElement = screen.getByText(/Buscar Filme/i);
    fireEvent.click(buttonElement);

    // Espera a mensagem de erro ser exibida
    await waitFor(() => {
      expect(screen.getByText(/Por favor, preencha todos os campos./i)).toBeInTheDocument();
    });
  });

  test('displays error message when network error occurs', async () => {
    // Mock da função submitQuery para retornar um erro de rede
    submitQuery.mockRejectedValueOnce(new Error('Network Error'));

    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });
    fireEvent.click(screen.getByText(/Buscar Filme/i));

    await screen.findByText(/Erro ao buscar dados. Tente novamente mais tarde./i);
  });

  test('hides loading indicator after fetching data', async () => {
    render(<HomePage />);

    submitQuery.mockResolvedValueOnce({ message: 'Mocked data' });

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });
    fireEvent.click(screen.getByText(/Buscar Filme/i));

    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Carregando.../i)).not.toBeInTheDocument());
  });

  test('handles different API response formats correctly', async () => {
    // Mock da função submitQuery para simular resposta da API
    jest.spyOn(require('../../api'), 'submitQuery').mockResolvedValue({ message: 'Mocked Movie' });

    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });

    fireEvent.click(screen.getByText(/Buscar Filme/i));

    // Aguarda o resultado ser exibido
    await screen.findByText(/Mocked Movie/i);

    // Limpeza do mock
    jest.restoreAllMocks();
  });


  test('displays success message when data is fetched successfully', async () => {
    submitQuery.mockResolvedValueOnce({ message: 'Filme encontrado!' });

    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });
    fireEvent.click(screen.getByText(/Buscar Filme/i));

    await screen.findByText(/Filme encontrado!/i);
  });

  test('displays success message when data is fetched successfully', async () => {
    submitQuery.mockResolvedValueOnce({ message: 'Filme encontrado!' });

    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });
    fireEvent.click(screen.getByText(/Buscar Filme/i));

    await screen.findByText(/Filme encontrado!/i);
  });

  test('displays error message when invalid data is submitted', async () => {
    render(<HomePage />);

    const nameInput = screen.getByPlaceholderText(/Digite seu nome/i);
    const movieInput = screen.getByPlaceholderText(/Digite o nome do filme/i);
    const buttonElement = screen.getByText(/Buscar Filme/i);

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(movieInput, { target: { value: '' } });
    fireEvent.click(buttonElement);

    await screen.findByText(/Por favor, preencha todos os campos./i);
  });

  test('disables submit button while fetching data', async () => {
    submitQuery.mockResolvedValueOnce({ message: 'Mocked data' });

    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });
    const buttonElement = screen.getByText(/Buscar Filme/i);

    fireEvent.click(buttonElement);

    expect(buttonElement).toBeDisabled();
    await waitFor(() => expect(buttonElement).not.toBeDisabled());
  });

  test('displays error message when network error occurs', async () => {
    submitQuery.mockRejectedValueOnce(new Error('Network Error'));

    render(<HomePage />);

    fireEvent.change(screen.getByPlaceholderText(/Digite seu nome/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Digite o nome do filme/i), { target: { value: 'Inception' } });
    fireEvent.click(screen.getByText(/Buscar Filme/i));

    await screen.findByText(/Erro ao buscar dados. Tente novamente mais tarde./i);
  });
});

