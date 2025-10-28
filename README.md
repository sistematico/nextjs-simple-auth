# Next.js Simple Auth

<div style="text-align: center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/nextjs/dark/nextjs-logotype-dark-background.png">
    <img alt="Next.js Simple Auth" src="./assets/nextjs/light/nextjs-logotype-light-background.png">
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

Inicialize o banco de dados:

```bash
bun db:push
bun db:seed
```

Rode o servidor de desenvolvimento:

```bash
bun dev
```

Abra o endereço [http://localhost:3000](http://localhost:3000) no seu navegador e veja o resultado.

Você pode começar editando o arquivo `src/app/page.tsx`. A página atualiza automaticamente após a edição do arquivo.

## Saiba mais

Para aprender mais sobre o Next.js, leia as seguintes fontes:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre features da API Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js.

[[en](./README.en.md]|pt]