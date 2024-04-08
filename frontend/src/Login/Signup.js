    import React, { useState } from "react";
    import './Signup.css'
    import auth from '../firbaseinit';
    import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
    import Googlebutton from 'react-google-button'
    import { useNavigate } from "react-router-dom";
    import Regpic from '../assets/Regpic.jpg'
    import axios from "axios";


        
    const Signup = () => {
        const [username, setUsername] = useState();
        const [name, setName] = useState();
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
        const navigate = useNavigate();
        const [isRotated, setIsRotated] = useState(false); // State to manage rotation




        const [
            createUserWithEmailAndPassword,
            user,
            loading,
            error,
        ] = useCreateUserWithEmailAndPassword(auth);

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

        const handleSubmit = e => {
            e.preventDefault();
            createUserWithEmailAndPassword(email, password);

            const user = {
                name,
                username,
                email
            };
            axios.post(`http://localhost:5000/register`, user);

        }
        const handleGoogleSignIn = () => {
            signInWithGoogle();
            const user = {
                name: googleuser.displayName,
                email: googleuser.email,
            };

            axios.post(`http://localhost:5000/register`, user);

        }
        const handleGoToLogin = () => {
            setIsRotated(true);
            setTimeout(() => {
                navigate('/login');
            }, 300);
        };
        return (
            <div className="registration">
                <div className="reg"></div>
                <div>
                    <h2 className="registermain">Join with us</h2>
                    <p className="sufi">heartly thankful to join our club</p>
                    <img className="Regim" src={Regpic} alt="img" />
                    <center>
                        <div className="div1">
                            <center>
                                <div className="drop5">
                                    <form className="registrationForm" onSubmit={handleSubmit}>
                                        <label className="registrationTitle">REGISTER</label>
                                        <label className="registrationitem">
                                            Username :&nbsp;
                                            <input
                                                className="registrationInput"
                                                type="text"
                                                name="username"
                                                placeholder="Your username..."
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </label>
                                        <label className="registrationitem">
                                            Email :&nbsp;
                                            <input
                                                className="registrationInput"
                                                type="text"
                                                placeholder="Enter your email..."
                                                name="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </label>
                                        <label className="registrationitem">
                                            Password :&nbsp;
                                            <input
                                                className="registrationInput"
                                                type="password"
                                                placeholder="Enter your password..."
                                                name="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </label>
                                        <button type="submit" className="btn" onClick={() => createUserWithEmailAndPassword(email, password)}>Signup</button>
                                    </form>
                                    <hr />
                                    <div className="google-btn">
                                        <Googlebutton
                                            className="g-btn"
                                            type="light"
                                            onClick={handleGoogleSignIn}
                                        />

                                    </div>
                                </div>
                                <div className='registrationLoginButton' onClick={handleGoToLogin} >
                                    Already have an account?
                                    <span style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        fontWeight: '600',
                                        marginLeft: '5px',
                                        cursor: 'pointer', // Add cursor pointer for better UX
                                    }}>
                                        Login
                                    </span>
                                </div>
                            </center>
                        </div>
                    </center>
                </div>
            </div>
        );
    }

    export default Signup;