import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../api';
import './HistoryTable.css'; // Adicionados estilos CSS

const HistoryTable = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="table-container">
      {history.length === 0 ? (
        <p>Nenhum histórico disponível</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Filme</th>
              <th>Resultado</th>
              <th>Data e hora da consulta</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.user}</td>
                <td>{entry.movie_name}</td>
                <td>{JSON.stringify(entry.result)}</td>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryTable;

