import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title} | Recipe App</title>
        <meta name="description" content="A delicious recipe app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Recipe App</p>
      </footer>
    </>
  );
}