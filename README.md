# Frontend da Aplicação Cinematic

Este repositório contém o frontend da aplicação Cinematic, desenvolvido utilizando ReactJS. A aplicação permite ao usuário buscar informações sobre filmes e visualizar o histórico de buscas.

## Requisitos

Antes de iniciar, certifique-se de que você tem o Node.js e o npm instalados no seu sistema. Você pode baixar e instalar o Node.js [aqui](https://nodejs.org/).

## Instalação

Para configurar o projeto frontend, siga estas etapas:

1. **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```

2. **Instale as dependências:**

    No diretório do projeto, execute:

    ```bash
    npm install
    ```

## Estrutura do Projeto

- `public/` - Arquivos estáticos e o arquivo `index.html`.
- `src/` - Código-fonte do React.
  - `components/` - Componentes React reutilizáveis.
  - `pages/` - Componentes de página.
  - `App.js` - Componente principal da aplicação.
  - `index.js` - Ponto de entrada para a aplicação.
- `package.json` - Gerenciador de dependências e scripts do projeto.

## Execução da Aplicação

Para iniciar o servidor de desenvolvimento e rodar a aplicação localmente, execute:

```bash
npm start
```

Isso abrirá a aplicação em seu navegador padrão na URL `http://localhost:3000`.

## Testes

A aplicação frontend utiliza Jest para testes. Para rodar os testes, use o comando:

```bash
npm test
```

### Tipos de Testes

- **Testes Unitários:** Testam componentes individuais e funções.
- **Testes de Integração:** Testam a interação entre componentes e o sistema.

## Scripts

- **`npm start`** - Inicia o servidor de desenvolvimento.
- **`npm test`** - Executa os testes da aplicação.
- **`npm run build`** - Cria uma versão otimizada para produção da aplicação.
- **`npm run lint`** - Executa o linting do código para verificar problemas de estilo e erros.

## Configuração da API

Certifique-se de que o backend está em execução e acessível na URL configurada no frontend. A URL da API deve estar definida em:

- `src/api/config.js` - Modifique o valor de `API_BASE_URL` conforme a URL do seu backend.

Exemplo de configuração:

```javascript
export const API_BASE_URL = 'http://localhost:5000';
```

## Contribuindo

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça suas alterações e commit (`git commit -am 'Adiciona nova feature'`).
4. Envie para o branch principal (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Problemas e Sugestões

Se você encontrar problemas ou tiver sugestões para melhorias, abra uma issue no repositório.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---
