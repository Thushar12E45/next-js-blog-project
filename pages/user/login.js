import Link from 'next/link';
import useSWR from 'swr';
import Cookies from 'universal-cookie';
import router from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setUser({ email, password });
    const response = await fetch('https://mixd-blog.herokuapp.com/api/login', {
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const userDetails = await response.json();
    if (userDetails.success) {
      const cookies = new Cookies();
      cookies.set('jwtToken', userDetails.token, { path: '/' });
      cookies.set('userId', userDetails.user.id);
      localStorage.setItem('isLogged', true);

      router.push('/');
    } else {
      setErrorMessage(userDetails.msg);
    }
  };
  return (
    <>
      <Header />
      <h2> Login</h2>

      <div className="page-divide">
        <img src="/images/loginImage.png" alt="Image of a coder working" className="left-side" />

        <div className="right-side login">
          <div className="alert alert-error  " role="alert">
            {errorMessage}
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group  ">
              <label htmlFor="email">
                {' '}
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control  login-form"
                  defaultValue={user.email}
                />
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                {' '}
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control login-form"
                  defaultValue={user.email}
                />
              </label>
            </div>

            <div className="center">
              <button type="submit" className="btn blue login-btn">
                Login
              </button>
              <Link href="/">
                <a className="abutton grey">Cancel</a>
              </Link>
            </div>
          </form>
          <h5>
            <Link href="/user/register">
              <a className="center">Need an account?</a>
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
}
