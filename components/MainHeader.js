import Link from 'next/link';
import Head from 'next/head';
import Cookies from 'universal-cookie';
import router, { useRouter } from 'next/router';

const handleLogout = () => {
  const cookies = new Cookies();
  cookies.remove('jwtToken');
  cookies.remove('userId');
  localStorage.setItem('isLogged', false);
  router.push(`/`);
};
const handleHomeRoute = () => {
  window.location.reload();
};
export default function Header() {
  const Router = useRouter();

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
          <img src="/images/logo.svg" className="logo" alt="A logo" width="50px" /> <Link href="/"> MIXD</Link>
        </h1>
        <div className="navigation">
          <span className="nav-alink">
            {Router.asPath !== '/' ? (
              <Link href="/">Home</Link>
            ) : (
              <button type="button" onClick={handleHomeRoute}>
                Home
              </button>
            )}
          </span>

          {localStorage.getItem('isLogged') === 'true' ? (
            <>
              <span className="nav-alink">
                <Link href="/user/newArticle"> New Article </Link>
              </span>

              <span className="nav-alink">
                <button type="button" onClick={handleLogout}>
                  {' '}
                  Logout{' '}
                </button>
              </span>
            </>
          ) : (
            <>
              <span className="nav-alink">
                <Link href="/user/login">
                  <a>Log In </a>
                </Link>
              </span>
              <span className="nav-alink">
                <Link href="/user/register">
                  <a>Register </a>
                </Link>
              </span>
            </>
          )}
        </div>
      </header>
    </>
  );
}
