import Link from 'next/link';
import router from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import Header from '../../components/Header';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    const response = await fetch('https://mixd-blog.herokuapp.com/api/register', {
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const userDetails = await response.json();
    if (userDetails.success) {
      router.push('/user/login');
    } else {
      setErrorMessage(userDetails[0].msg);
    }
  };

  return (
    <>
      <Header />

      <h2> Register </h2>

      <div className="page-divide">
        <img src="/images/registerImage.png" alt="Image of a coder working" className="left-side" />

        <div className="register right-side">
          <div className="alert alert-error  " role="alert">
            {errorMessage}
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group ">
              <label htmlFor="name">
                Name
                <input type="name" id="name" name="name" className="form-control login-form" defaultValue={user.name} />
              </label>
            </div>

            <div className="form-group ">
              <label htmlFor=" email">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control login-form"
                  defaultValue={user.email}
                />{' '}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control login-form"
                  defaultValue={user.password}
                />
              </label>
            </div>

            <div className="form-group ">
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control login-form"
                  defaultValue={user.confirmPassword}
                />
              </label>
            </div>

            <div className="center">
              <button type="submit" className="btn green register-btn">
                Register
              </button>
              <Link href="/">
                <a className="abutton grey">Cancel</a>
              </Link>
            </div>
          </form>
          <h5>
            <Link href="/user/login">
              <a className="center"> Have an account?</a>
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
}
