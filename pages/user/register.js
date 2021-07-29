import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import styles from '../../components/LoginAndRegister.module.css';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
      toast.error(userDetails[0].msg, { position: toast.POSITION.TOP_CENTER, autoClose: 5000 });
    }
  };

  return (
    <>
      <Header />

      <h2> Register </h2>

      <div className={styles.pageDivide}>
        <img src="/images/registerImage.png" alt="Image of a coder working" className={styles.leftSide} />

        <div className={`${styles.register} ${styles.rightSide}`}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="name">
                Name
                <input
                  type="name"
                  id="name"
                  name="name"
                  className={styles.registerForm}
                  defaultValue={user.name}
                  required
                />
              </label>
            </div>

            <div>
              <label htmlFor=" email">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.registerForm}
                  defaultValue={user.email}
                  required
                />{' '}
              </label>
            </div>

            <div>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={styles.registerForm}
                  defaultValue={user.password}
                  required
                />
              </label>
            </div>

            <div>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.registerForm}
                  defaultValue={user.confirmPassword}
                  required
                />
              </label>
            </div>

            <div className={styles.center}>
              <button type="submit" className={`${styles.btn} ${styles.green} ${styles.registerBtn}`}>
                Register
              </button>
              <Link href="/">
                <a className={`${styles.abutton} ${styles.grey}`}>Cancel</a>
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
