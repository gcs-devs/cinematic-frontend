import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HistoryTable from '../HistoryTable';
import { fetchHistory } from '../../api';

// Mock do fetchHistory
jest.mock('../../api', () => ({
  fetchHistory: jest.fn()
}));

describe('HistoryTable', () => {
  it('renders HistoryTable with data', async () => {
    // Mock da resposta do fetchHistory
    fetchHistory.mockResolvedValue([
      { _id: '1', user: 'Alice', movie_name: 'The Matrix', result: { score: 4 }, timestamp: '2024-07-25T12:00:00Z' }
    ]);

    render(<HistoryTable />);

    await waitFor(() => {
      expect(screen.getByText(/Nome/i)).toBeInTheDocument();
      expect(screen.getByText(/Filme/i)).toBeInTheDocument();
      expect(screen.getByText(/Resultado/i)).toBeInTheDocument();
      expect(screen.getByText(/Data e hora da consulta/i)).toBeInTheDocument();
      expect(screen.getByText(/Alice/i)).toBeInTheDocument();
      expect(screen.getByText(/The Matrix/i)).toBeInTheDocument();
      expect(screen.getByText(/{"score":4}/i)).toBeInTheDocument();
    });
  });

  it('renders empty message when no history is provided', async () => {
    fetchHistory.mockResolvedValue([]);

    render(<HistoryTable />);

    await waitFor(() => {
      expect(screen.getByText(/Nenhum histórico disponível/i)).toBeInTheDocument();
    });
  });

  it('displays different data correctly', async () => {
    fetchHistory.mockResolvedValue([
      { _id: '1', user: 'Bob', movie_name: 'Inception', result: { score: 5 }, timestamp: '2024-07-25T14:00:00Z' }
    ]);

    render(<HistoryTable />);

    await waitFor(() => {
      expect(screen.getByText(/Bob/i)).toBeInTheDocument();
      expect(screen.getByText(/Inception/i)).toBeInTheDocument();
      expect(screen.getByText(/{"score":5}/i)).toBeInTheDocument();
    });
  });

  it('renders correctly on different screen sizes', () => {
    window.innerWidth = 500;
    render(<HistoryTable />);

    // Simula um tempo para a tabela ser renderizada
    waitFor(() => {
      expect(screen.getByRole('table')).toHaveClass('responsive-table');
    });

    // Simula tamanho de tela grande
    window.innerWidth = 1200;
    render(<HistoryTable />);

    waitFor(() => {
      expect(screen.getByRole('table')).not.toHaveClass('responsive-table');
    });
  });
});

