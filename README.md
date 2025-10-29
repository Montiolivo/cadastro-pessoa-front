# 🧾 CadastroPessoa Front-End

Aplicação React.js desenvolvida para consumo da API CadastroPessoa, permitindo o cadastro, listagem e exclusão de pessoas.
O projeto utiliza autenticação via JWT e foi publicado no Azure App Service.

🌐 Aplicação publicada:
👉 https://cadastropessoafront-c7f9fpcpaxf8d8ch.brazilsouth-01.azurewebsites.net/

## 🚀 Funcionalidades

Login com autenticação via token JWT.

Listagem de pessoas cadastradas.

Cadastro de novas pessoas.

Edição e exclusão de registros.

Integração com API hospedada no Azure.

Controle de acesso por usuário autenticado.

## 🔐 Usuários de Acesso (para testes)
Usuário	Senha
admin	123456
usuario	senha123
## ⚙️ Tecnologias Utilizadas

React.js 18+

Axios para requisições HTTP

React Router DOM para navegação

Material-UI (MUI) para interface visual

Vite / CRA (dependendo da sua config)

Context API / Hooks para controle de estado

JWT Authentication

## 🧩 Estrutura de Pastas
src/
 ├── components/
 │   ├── PersonCard.jsx
 │   ├── PrivateRoute.jsx
 │   ├── Layout.jsx
 │   └── Header.jsx
 ├── pages/
 │   ├── Login.jsx
 │   ├── PersonList.jsx
 │   └── PersonForm.jsx
 ├── services/
 │   └── api.js
 ├── App.jsx
 ├── styles.css
 └── index.jsx

## 🔧 Configuração do Ambiente
1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/cadastro-pessoa-front.git
cd cadastro-pessoa-front

2. Instalar dependências
npm install

3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

REACT_APP_API_URL=https://cadastropessoaapi-eceef3euh4e0hdbs.brazilsouth-01.azurewebsites.net/api/v1

## ▶️ Executar o projeto localmente
npm start


O projeto será iniciado em:

http://localhost:3000

## 🏗️ Build para Produção
npm run build


Os arquivos otimizados serão gerados na pasta /build.

🔗 API Back-End

A aplicação consome a API .NET hospedada no Azure:

🔹 URL da API:
https://cadastropessoaapi-eceef3euh4e0hdbs.brazilsouth-01.azurewebsites.net/swagger

📜 Licença

Este projeto é de uso livre para fins educacionais e demonstração técnica.
