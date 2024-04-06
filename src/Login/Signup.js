import React, { useState } from "react";
import { useEffect } from "react";
import './Login.css'
import auth from '../firbaseinit';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Googlebutton from 'react-google-button'
import { useNavigate} from "react-router-dom";
import VanillaTilt from 'vanilla-tilt';




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
            username: username,
            name: name,
            email: email,

        }
        console.log()
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }
    const handleGoToLogin = () => {
        setIsRotated(true); 
        setTimeout(() => {
            navigate('/login');
        }, 300);
    };
    return (
        <div className="Login-container">
            <div class="form-container box">
                <div className="form-box">
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            className="display-name"
                            placeholder="@username"
                            onChange={(e) => setUsername(e.target.value)} />
                        <input type="text"
                            className="display-name"
                            placeholder="Enter full name"
                            onChange={(e) => setUsername(e.target.value)} />
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
                            <button type="submit" className="btn" onClick={() => createUserWithEmailAndPassword(email, password)}>Signup</button>
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
                        Already have an account?
                        <span onClick={handleGoToLogin} style={{
                            textDecoration: 'none',
                            color: 'white',
                            fontWeight: '600',
                            marginLeft: '5px',
                            cursor: 'pointer', // Add cursor pointer for better UX
                        }}>
                            Login
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup;