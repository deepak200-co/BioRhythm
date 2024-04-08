import './Login.css';
import React, { useState, useEffect, useRef } from "react";
import  auth  from '../firbaseinit';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Googlebutton from 'react-google-button'
import { useNavigate }from 'react-router-dom';
import axios from 'axios'


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
    <div className="logcir"></div>
      <div className="loginpage">
        <img
          className="logipic"
          src="https://raw.githubusercontent.com/trananhtuat/animated-login-registration/353a7bb31a0e21f6344af06868805656476d26d3/assets/undraw_creative_team_r90h.svg"
          alt=""
        />
        <div className="login">
          <div className="drop">
            <form className="loginForm" onSubmit={handleSubmit}>
              <span className="loginTitle">LOGIN</span>
              <label className="ht">Email</label>
              <input
                className="loginInput"
                type="text"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <label className="ht">Password</label>
              <input
                className="loginInput"
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <button type="submit" className="loginButton" onClick={() => signInWithEmailAndPassword(email, password)}>Login</button>
            </form>
            <hr />
            <div className="google-btn">
              <Googlebutton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignIn}
              />

            </div>
          </div >
          <div className='loginRegisterButton' onClick={handleGoToSignup}>
          Don't have an account?
              <span  style={{
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
    </>
  );
};

export default Login;