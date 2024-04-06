import './Login.css';
import React, { useState, useEffect, useRef } from "react";
import  auth  from '../firbaseinit';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Googlebutton from 'react-google-button'
import { useNavigate }from 'react-router-dom';






const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
  const formContainerRef = useRef(null);
  const [isRotated, setIsRotated] = useState(false); // State to manage rotation

  const navigate = useNavigate();


   
  const handleGoToSignup = () => {
    setIsRotated(true);
    setTimeout(() => {
      navigate('/signup');
    }, 900);
  };


  if (error) {
    console.log(error.message)
  }
  if (user || googleuser) {
    navigate('/')
    console.log(user)
    console.log(googleuser)
  }
  if (loading) {
    console.log('loading....')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }
  

  return (
    <>
      <div className="Login-container">
        <div ref={formContainerRef} class="form-container box">
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <input type="email"
                className="email"
                placeholder="email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password"
                className="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn-login">
                <button type="submit" className="btn" onClick={() => signInWithEmailAndPassword(email, password)}>Login</button>
              </div>
            </form>
            <hr />
            <div className="google-btn">
              <Googlebutton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignIn}
              />

            </div>
            <div className='sign-login'>
              Don't have an account?
              <span onClick={handleGoToSignup} style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                marginLeft: '5px',
                cursor: 'pointer',
              }}>
                Signup
              </span>
            </div>
          </div>

        </div>

      </div>
    </>

  );
};

export default Login;
