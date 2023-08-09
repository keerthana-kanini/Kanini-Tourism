import React, { useState } from 'react';
import logo from './logo1.jpg.png';

const Navbar = () => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
  
    const toggleNav = () => {
      setNavOpen((prevState) => !prevState);
    };
  
    const toggleLoginDropdown = () => {
      setLoginOpen((prevState) => !prevState);
    };
  
  return (
    <div>
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo Image" />
      </div>
      <div className={`hamburger ${isNavOpen ? 'toggle' : ''}`} onClick={toggleNav}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/approve">Request Approved</a>
        </li>
        <li>
          <a href="#">Gallery</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
        <li className="login-dropdown">
          <button className="login-button" onClick={toggleLoginDropdown}>Login</button>
          {isLoginOpen && (
            <ul className="login-options">
              <li>
                <a href="/adminsignin">Admin</a>
              </li>
              <li>
                <a href="/user-login">User</a>
              </li>
              <li>
                <a href="/agencyreg">Agent</a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
    <div>
        <style>
            {`
            ol ol, ol ul, ul ol, ul ul {
                margin-bottom: -96px;
            }
           *{
            margin: 0;
            padding: 0;
            color: black;
            font-family: sans-serif;
            letter-spacing: 1px;
            font-weight: 300;
            height: -28px;
        }
        body{
            overflow-x: hidden;
        }
        nav{
            height: 6rem;
            width: 100vw;
            background-color: #131418;
            box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            position: fixed;
            z-index: 10;
        }
        
        /*Styling logo*/
        .logo{
            padding:1vh 1vw;
            text-align: center;
        }
        .logo img {
            height: 5rem;
            width: 8rem;
        }
        
        /*Styling Links*/
        .nav-links{
            display: flex;
            list-style: none; 
            width: 88vw;
            padding: 0 0.7vw;
            justify-content: space-evenly;
            align-items: center;
            text-transform: uppercase;
        }
        .nav-links li a{
            text-decoration: none;
            margin: 0 0.7vw;
        }
        .nav-links li a:hover {
            color: #61DAFB;
        }
        .nav-links li {
            position: relative;
        }
        .nav-links li a::before {
            content: "";
            display: block;
            height: 3px;
            width: 0%;
            background-color: #61DAFB;
            position: absolute;
            transition: all ease-in-out 250ms;
            margin: 0 0 0 10%;
        }
        .nav-links li a:hover::before{
            width: 80%;
        }
        
        /*Styling Buttons*/
        .login-button{
            background-color: transparent;
            border: 1.5px solid #f2f5f7;
            border-radius: 2em;
            padding: 0.6rem 0.8rem;
            margin-left: 2vw;
            font-size: 1.5rem;
            cursor: pointer;
        
        }
        .login-button:hover {
            color: #131418;
            background-color: #f2f5f7;
            border:1.5px solid #f2f5f7;
            transition: all ease-in-out 350ms;
        }
        .join-button{
            color: #131418;
            background-color: #61DAFB;
            border: 1.5px solid #61DAFB;
            border-radius: 2em;
            padding: 0.6rem 0.8rem;
            font-size: 1rem;
            cursor: pointer;
        }
        .join-button:hover {
            color: #f2f5f7;
            background-color: transparent;
            border:1.5px solid #f2f5f7;
            transition: all ease-in-out 350ms;
        }
        
        /*Styling Hamburger Icon*/
        .hamburger div{
            width: 30px;
            height:3px;
            background: #f2f5f7;
            margin: 5px;
            transition: all 0.3s ease;
        }
        .hamburger{
            display: none;
        }
        
        /*Stying for small screens*/
        @media screen and (max-width: 800px){
            nav{
                position: fixed;
                z-index: 3;
            }
            .hamburger{
                display:block;
                position: absolute;
                cursor: pointer;
                right: 5%;
                top: 50%;
                transform: translate(-5%, -50%);
                z-index: 2;
                transition: all 0.7s ease;
            }
            .nav-links{
                position: fixed;
                background: #131418;
                height: 100vh;
                width: 100%;
                flex-direction: column;
                clip-path: circle(50px at 90% -20%);
                -webkit-clip-path: circle(50px at 90% -10%);
                transition: all 1s ease-out;
                pointer-events: none;
            }
            .nav-links.open{
                clip-path: circle(1000px at 90% -10%);
                -webkit-clip-path: circle(1000px at 90% -10%);
                pointer-events: all;
            }
            .nav-links li{
                opacity: 0;
            }
            .nav-links li:nth-child(1){
                transition: all 0.5s ease 0.2s;
            }
            .nav-links li:nth-child(2){
                transition: all 0.5s ease 0.4s;
            }
            .nav-links li:nth-child(3){
                transition: all 0.5s ease 0.6s;
            }
            .nav-links li:nth-child(4){
                transition: all 0.5s ease 0.7s;
            }
            .nav-links li:nth-child(5){
                transition: all 0.5s ease 0.8s;
            }
            .nav-links li:nth-child(6){
                transition: all 0.5s ease 0.9s;
                margin: 0;
            }
            .nav-links li:nth-child(7){
                transition: all 0.5s ease 1s;
                margin: 0;
            }
            li.fade{
                opacity: 1;
            }
        }
        /*Animating Hamburger Icon on Click*/
        .toggle .line1{
            transform: rotate(-45deg) translate(-5px,6px);
        }
        .toggle .line2{
            transition: all 0.7s ease;
            width:0;
        }
        .toggle .line3{
            transform: rotate(45deg) translate(-5px,-6px);
        }
            `}
        </style>
        </div>
    </div>
  );
};

export default Navbar;