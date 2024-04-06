import React, { useState,useEffect } from 'react';
import './Navbar.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firbaseinit';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(()=> {
    AOS.init({duration: 1000})
  })

  const handleLogout = () => {
    auth.signOut().then(() => {
      setDropdownOpen(false);
      window.location.href = '/login';
    });
  };

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        {user && (
          <div className='user-info'>
            <span className='welcome-text' data-aos='ease-in'>Welcome, {user.displayName}</span>
          </div>
        )}
      </div>
      <div className='navbar-center'>
        <h1>BioRhythm</h1>
      </div>
      <div className='navbar-right'>
        {user && (
          <div className='user-info' onClick={toggleDropdown}>
            <img src={user.photoURL} alt='User Profile' className='profile-pic' />
            <span className='user-name'>{user.displayName}</span>
            {dropdownOpen && (
              <div className="dropdown-content">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
