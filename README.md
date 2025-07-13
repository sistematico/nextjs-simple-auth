# Next.js Simple Auth

<div style="text-align: center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/nextjs/logotype/dark-background/nextjs-logotype-dark-background.png">
    <img alt="Text changing depending on mode. Light: 'So light!' Dark: 'So dark!'" src="./assets/nextjs/logotype/light-background/nextjs-logotype-light-background.png">
  </picture>
</div>

[![Deploy](https://github.com/sistematico/nextjs-simple-auth/actions/workflows/deploy.yml/badge.svg)](https://github.com/sistematico/nextjs-simple-auth/actions/workflows/deploy.yml)

Este foi um projeto criado com o [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) usando o [Next.js](https://nextjs.org).

## Iniciando

Copie o conteúdo do arquivo `.env.development` para um novo arquivo `.env`.

Instale as dependências:

```bash
bun install
```

Inicie o container do Podman:

```bash
bash scripts/podman.sh
```

Inicialize o banco de dados:

```bash
bun db:push
bun db:generate
bun db:seed
```

Rode o servidor de desenvolvimento:

```bash
bun dev
```

Abra o endereço [http://localhost:3000](http://localhost:3000) no seu navegador e veja o resultado.

Você pode começar editando o arquivo `src/app/page.tsx`. A página atualiza automaticamente após a edição do arquivo.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Saiba mais

Para aprender mais sobre o Next.js, leia as seguintes fontes:

- [Documentação do Next.js](https://nextjs.org/docs) - learn about Next.js features and API.
- [Aprenda Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

[[en](./README.en.md]|pt]