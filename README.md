# PPGCC Select - Sistema de Gerenciamento de Processos Seletivos do PPGCC

![PPGCC Select](https://github.com/Kaiorc/ppgccelect/blob/master/src/assets/images/logo-ppgcc-select-side-cropped.png?raw=true)

Este projeto é uma aplicação web desenvolvida em **React** com **Vite** e **Firebase** para gerenciamento de processos seletivos do Programa de Pós-Graduação em Ciência da Computação (PPGCC) da Universidade Estadual do Ceará (UECE). Ele permite que administradores criem, editem e gerenciem processos seletivos, enquanto candidatos podem criar contas utilizando e-mail e senha ou autenticação com o Google, se inscrever e acompanhar atualizações sobre os processos seletivos.

## 💻 Acesso
**[Clique aqui para acessar o PPGCC Select](https://ppgccselect.netlify.app/)**

## 💥 Funcionalidades

### Para Administradores
- **Criação e edição de processos seletivos** com campos dinâmicos
- **Gerenciamento de inscrições** (visualização, avaliação, alteração de status)
- **Publicação de avisos/atualizações** para cada processo
- **Exportação de resultados** em PDF
- **Controle de datas**

### Para Candidatos
- **Cadastro e login**
- **Inscrição em processos seletivos** com envio de documentos
- **Acompanhamento do status da inscrição**
- **Deleção de inscrição**
- **Visualização de atualizações e avisos**
- **Recuperação de senha**

## 📁 Estrutura de Pastas

```
.
├── App.jsx
├── index.jsx
├── public/
├── services/
│   ├── appwrite/
│   │   ├── appwrite-config.js
│   │   └── appwrite-storage.js
│   └── firebase/
│       ├── firebase-authentication.js
│       ├── firebase-cloud-storage.js
│       ├── firebase-config.js
│       └── firebase-firestore.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── utils/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

- **services/**: Integrações com Firebase e Appwrite.
- **src/pages/**: Páginas principais.
- **src/components/**: Componentes reutilizáveis (Header, Inputs, Tabelas, Modais, etc).
- **src/utils/**: Funções utilitárias e validadores.
- **public/**: Imagens e arquivos estáticos.

## 🔧 Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Firebase (Authentication, Cloud Firestore, Cloud Storage)](https://firebase.google.com/)
- [Appwrite Storage](https://appwrite.io/)
- [Styled-components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Router](https://reactrouter.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [ESLint](https://eslint.org/)

### 📤 Deploy

O sistema está hospedado no **Netlify** e pode ser acessado publicamente. O arquivo `netlify.toml` já está configurado para deploy automático.

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js >= 16.x
- Conta no Firebase e Appwrite (configurar variáveis de ambiente)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_APPWRITE_ENDPOINT=...
VITE_APPWRITE_PROJECT_ID=...
VITE_APPWRITE_BUCKET_ID=...
```

### 📥 Instalação

```sh
npm install
```

### 🔃 Rodando em Desenvolvimento

```sh
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

### 🔃 Build para Produção

```sh
npm run build
```