# 🧠 ZenSoft – Plataforma de Bem-Estar e Produtividade  
### Front-End (React + Vite + TypeScript)

---

## 📌 Status do Projeto  
✔️ Em desenvolvimento  
⬜ Backend integrado  
⬜ Deploy na Vercel

---

## 📑 Sumário  
1. [Sobre o Projeto](#-sobre-o-projeto)  
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
3. [Instalação](#-instalação)  
4. [Como Usar](#-como-usar)  
5. [Estrutura de Pastas](#-estrutura-de-pastas)  
6. [Principais Rotas](#-principais-rotas)  
7. [API Utilizada](#-api-utilizada)  
8. [Screenshots](#-screenshots)  
9. [Autores](#-autores)  
10. [Contato](#-contato)

---

## 💡 Sobre o Projeto  
O **ZenSoft / ZenHub** é uma plataforma desenvolvida para apoiar o bem-estar mental e a produtividade de profissionais.  
A solução integra:

- Sessões de foco e respiração  
- Gamificação com conquistas  
- Painel emocional e relatórios  
- Sistema de usuários com login, cadastro e dashboard  
- Comunicação com API Java (DDD + Quarkus)  
- Banco de dados Oracle (Relacional)

Este sistema compõe a entrega integrada da **Global Solution – FIAP 2025/2**, conectando:

- Front-End  
- Domain Driven Design (Java + API)  

---

## 🛠 Tecnologias Utilizadas  

### **Front-End**
- React + Vite
- TypeScript
- TailwindCSS (obrigatório)
- Context API (Tema claro/escuro + autenticação)
- React Router DOM

### **Ferramentas**
- Git & GitHub (GitFlow)
- Vercel (Deploy)
- Figma (Protótipo)

---

## 🚀 Instalação  

### 1. Clone o repositório
```sh
git clone https://github.com/Global-Solution-2-semestre/front-gs2-vsfinal
cd NOME_DO_REPOSITORIO
2. Instale as dependências
sh
Copiar código
npm install
3. Execute o servidor local
sh
Copiar código
npm run dev
4. Variáveis de ambiente (exemplo)
Crie .env:

ini
Copiar código
VITE_API_URL=https://sua-api-deploy.com
▶️ Como Usar
Abra o projeto no navegador em:
http://localhost:5173

Acesse:

/auth → Login e cadastro

/dashboard → Dashboard com estatísticas

/perfil → Perfil do usuário

/integrantes → Página da equipe

Todas as ações como login, cadastro e CRUD devem se comunicar com a API Java hospedada.

📁 Estrutura de Pastas
css
Copiar código
src/
 ├── components/
 │     ├── Button.tsx
 │     ├── Card.tsx
 │     ├── Header.tsx
 │     └── ...
 ├── pages/
 │     ├── Landing.tsx
 │     ├── Auth.tsx
 │     ├── Dashboard.tsx
 │     ├── Perfil.tsx
 │     └── Integrantes.tsx
 ├── context/
 │     └── UserContext.tsx
 ├── hooks/
 ├── services/
 │     └── api.ts
 ├── styles/
 ├── App.tsx
 └── main.tsx
🔗 Principais Rotas
Rota	Descrição
/	Página inicial
/auth	Login / Cadastro
/dashboard	Painel do usuário
/perfil	Dados e estatísticas do usuário
/integrantes	Página dos membros do grupo
/sobre	Sobre o projeto
/faq	Perguntas frequentes
*	Página 404

🌐 API Utilizada
A aplicação consome a API Java desenvolvida em Domain Driven Design, hospedada em:

cpp
Copiar código
https://zenhub-render.onrender.com
Endpoints utilizados (exemplo)
Método	Endpoint	Função
POST	/usuarios/login	Autenticação
POST	/usuarios	Cadastro
GET	/usuarios/{id}	Perfil
PUT	/usuarios/{id}	Atualizar usuário

Todos os endpoints devem estar sincronizados com o backend.

👥 Autores
Projeto desenvolvido pelos alunos da FIAP – 1TDS – Fevereiro

Nome	RM	Função	GitHub	LinkedIn
Nícolas de Oliveira Jacob	564205	Front-End Dev	GitHub	LinkedIn
Gustavo Barrios de Araújo	563358	Back-End / API	GitHub	LinkedIn
Vinicius Romaguera Cardozo	562308	Banco de Dados / IA	GitHub	LinkedIn

