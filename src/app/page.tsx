import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>Hello world!</div>
      <Link href="/entrar">Entrar</Link>
      <Link href="/cadastro">Cadastro</Link>
    </main>
  );
}
