# Next.js Simple Auth

![Next.js](public/nextjs.svg)

> Projeto de exemplo de autenticação com Next.js + Drizzle ORM (SQLite) usando sessões JWT em cookie.

## 🔍 Descrição

**nextjs-simple-auth** é um exemplo minimalista de autenticação com Next.js (App Router), Drizzle ORM (SQLite) para persistência, e sessões baseadas em JWT armazenadas em cookie. O objetivo é demonstrar um fluxo simples e seguro de **Login**, **Cadastro** e **Logout** com boas práticas (hash de senha, salt, validações com Zod).

## ✨ Recursos principais

- Autenticação com senha (salt + hash)
- Criação de conta (registro)
- Sessões via JWT armazenadas em cookie (HTTP-only)
- ORM: Drizzle (schema e queries em `src/db`)
- Validações com Zod (`src/schema`)

---

## 🔁 Fluxo (diagrama)

Abaixo está um diagrama Mermaid com o fluxo de Login, Cadastro e Logout:

```mermaid
flowchart LR
  U[Usuário] --> L[Visita /login ou /register]

  subgraph SignIn[Login]
    L --> F1[Preenche formulário de login]
    F1 --> S1{Enviar credenciais}
    S1 -->|OK| Q1[Consulta usuário no DB (Drizzle)]
    Q1 --> P1{Usuário encontrado?}
    P1 -->|Sim| V1[Compara hash da senha]
    V1 -->|Match| C1[Cria sessão JWT e salva cookie]
    V1 -->|Não| E1[Retorna erro: e-mail/senha inválidos]
    P1 -->|Não| E1
    C1 --> R1[Redireciona para / (autenticado)]
  end

  subgraph SignUp[Cadastro]
    L --> F2[Preenche formulário de cadastro]
    F2 --> S2{Enviar dados}
    S2 --> Q2[Verifica e-mail existente]
    Q2 -->|Não existe| I1[Insere usuário (Drizzle) com salt+hash]
    I1 --> C2[Cria sessão JWT e salva cookie]
    C2 --> R1
    Q2 -->|Existe| E2[Retorna erro: e-mail já existe]
  end

  subgraph Logout[Logout]
    R1 --> O1[Usuário clica em logout]
    O1 --> D1[Limpa cookie de sessão]
    D1 --> R2[Redireciona para / (não autenticado)]
  end
```

> Observação: os passos de verificação de senha e criação de sessão ocorrem no lado servidor (em `src/actions.ts` e `src/lib/session.ts`).

---

## 🚀 Como rodar (rápido)

1. Instale dependências:

```bash
pnpm install
```

2. Crie um arquivo `.env` com as variáveis necessárias (exemplo):

```env
DB_FILE_NAME=./db/sqlite.db
SESSION_SECRET=uma_chave_secreta_muito_segura
```

3. Rode em modo desenvolvimento:

```bash
pnpm dev
```

Abra `http://localhost:3000`.

---

## 🧩 Integração com Drizzle

- O schema está em `src/db/schema.ts` (tabela `users`).
- O cliente `db` é exportado em `src/db/index.ts` e usado nas ações (`src/actions.ts`) para consultas e inserções.

---

## � Nota sobre rotas de API

As rotas da pasta `src/app/api/*` foram removidas neste repositório porque o frontend atual gerencia sessão localmente via `AuthProvider` (localStorage) e **não** faz chamadas para `/api/*`. Se você precisa de endpoints para integrações externas, testes E2E ou autenticação server-side, podemos adicioná-los novamente ou migrar o frontend para utilizar essas APIs.

---

## �🛠️ Notas de implementação

- Senhas: geradas com salt + hash (`src/lib/password.ts`).
- Sessão: JWT curto para demonstração (veja `src/lib/session.ts`). Ajuste o tempo de expiração conforme sua necessidade.
- Validações: Zod em `src/schema` para evitar dados inválidos.

---

## ♻️ Contribuições

Contribuições são bem-vindas. Abra issues ou PRs com melhorias (tests, CI, melhor fluxo de sessão, etc.).

---

## 📄 Licença

MIT

