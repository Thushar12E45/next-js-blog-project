import Head from 'next/head';

export default function Header() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" />
        <title> Mixd </title>
        <link rel="icon" href="/images/logo.svg" type="image/icon type" />
      </Head>
      <header>
        <h1>
          {' '}
          <img src="/images/logo.svg" alt="A logo" width="50px" /> MIXD{' '}
        </h1>
      </header>
    </>
  );
}
