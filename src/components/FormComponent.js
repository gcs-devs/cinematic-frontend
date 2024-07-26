import React, { useState } from 'react';
import { submitQuery } from '../api';
import './FormComponent.css';

const FormComponent = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [movie, setMovie] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !movie) {
      setError('Nome e nome do filme são obrigatórios.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Simular requisição
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = await submitQuery(name, movie); // Passe os parâmetros corretos
      setResult(data); // Armazena o resultado da busca no estado
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-component" onSubmit={handleSubmit} data-testid="form-component">
      <input
        placeholder="Digite seu nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Digite o nome do filme"
        type="text"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Buscar
      </button>
      {loading && <div>Carregando...</div>}
      {error && <div>{error}</div>}
      {result && (
        <div className="result">
          <h3>Resultado da Busca:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default FormComponent;

