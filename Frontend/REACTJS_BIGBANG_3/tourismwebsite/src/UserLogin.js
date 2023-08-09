import React, { useState, useEffect } from 'react';
import { variables } from './Variable'; // Replace with the correct path to Variable.js
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin() {
  const [isSignInActive, setIsSignInActive] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignInActive((prevState) => !prevState);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const username = formData.get('username');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const gender = formData.get('gender');
    const location = formData.get('location');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (isSignInActive) {
      // Sign-in functionality
      if (!username || !password) {
        toast.error('Please fill in both username and password.');
        return;
      }
      try {
        const response = await axios.post('https://localhost:7125/api/Token/User', {
          user_Name: username,
          user_Password: password,
        });
  
        if (response.status === 200) {
          // Sign-in successful
          console.log('Sign-in successful');
          toast.success('Sign-in successful');
          const token = response.data;
          localStorage.setItem('userToken', token); // Store the token in local storage
          setTimeout(() => {
            localStorage.removeItem('userToken');
            console.log('Token has been automatically deleted after 5 seconds.');
          }, 100000);
  
          // Fetch and store user ID
          try {
            const userIdResponse = await axios.get(`https://localhost:7125/api/Users/GetUserIdByUsername?username=${username}`);
  
            if (userIdResponse.status === 200) {
              const userId = userIdResponse.data; // Assuming the response.data contains the user ID
              localStorage.setItem('userId', userId);
            } else {
              console.error('Failed to fetch user ID:', userIdResponse.statusText);
            }
          } catch (error) {
            console.error('Error occurred while fetching user ID:', error);
          }
  
          navigate('/home');
          // Optionally, you can redirect the user to a success page or do any other action here.
        } else {
          // Sign-in failed
          console.error('Sign-in failed:', response.statusText);
          toast.error('Sign-in failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error occurred during sign-in:', error);
        toast.error('Error occurred during sign-in.');
      }
    
    } else {
        // Sign-up functionality
        if (
          !username ||
          !email ||
          !phone ||
          !gender ||
          !location ||
          !password ||
          !confirmPassword
        ) {
          toast.error('Please fill in all the required fields.');
          return;
        }
  
        if (password !== confirmPassword) {
          toast.error("Passwords don't match.");
          return;
        }
  
        try {
          const response = await axios.post(`${variables.API_URL}Users`, {
            user_Name: username,
            user_Email: email,
            user_Phone: phone,
            user_Gender: gender,
            user_Location: location,
            user_Password: password,
          });
  
          if (response.status === 201) {
            // Registration successful
            console.log('Registration successful');
            toast.success('Registration successful');
            // Optionally, you can redirect the user to a success page or do any other action here.
          } else {
            // Registration failed
            console.error('Registration failed:', response.statusText);
            toast.error('Error occurred during registration');
          }
        } catch (error) {
          console.error('Error occurred during registration:', error);
          toast.error('Error occurred during registration');
        }
      }
    };

  return (
    <>
      <ToastContainer />
    <section>
      <div className={`container ${isSignInActive ? '' : 'active'}`}>
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80"
              alt=""
            />
          </div>
          <div className="formBx">
              <form onSubmit={handleFormSubmit}>
                <h2>Sign In</h2>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Login" />
                <p className="signup">
                  Don't have an account ?
                 <a href="#" onClick={toggleForm}>
                      Sign Up
                    </a>
                </p>
              </form>
            </div>
            </div>
            <div className="user signupBx">
              <div className="formBx">
                <form onSubmit={handleFormSubmit}>
                  <h2>Create an account</h2>
                  <input type="text" name="username" placeholder="Username" required minLength="4" />
                  <input type="email" name="email" placeholder="Email Address" required />
                  <input type="tel" name="phone" placeholder="Phone" required pattern="[0-9]{10}" />
                  <div className="custom-select">
                    <select name="gender" required>
                      <option value="" disabled selected>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <input type="text" name="location" placeholder="Location" required />
                  <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  required
                  minLength="6"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  minLength="6"
                />
                <input type="submit" value="Sign Up" />
                <p className="signup">
                  Already have an account ?
                  <a href="#" onClick={toggleForm}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>
          <div className="imgBx">
            <img
              src="https://images.unsplash.com/photo-1531209889797-de15f0a74e7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>
        </div>
        
        <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }
          
          section {
            position: relative;
            min-height: 100vh;
            background: url("https://img.freepik.com/free-photo/solid-navy-blue-concrete-textured-wall_53876-124584.jpg") no-repeat center/cover;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          
          section .container {
            position: relative;
            width: 800px;
            height: 580px;
            background: #fff;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          section .container .user {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
          }
          
          section .container .user .imgBx {
            position: relative;
            width: 50%;
            height: 100%;
            background: #ff0;
            transition: 0.5s;
          }
          
          section .container .user .imgBx img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          section .container .user .formBx {
            position: relative;
            width: 50%;
            height: 100%;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
            transition: 0.5s;
          }
          
          section .container .user .formBx form h2 {
            font-size: 18px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
            width: 100%;
            margin-bottom: 10px;
            color: #555;
          }
          
          section .container .user .formBx form input {
            position: relative;
            width: 100%;
            padding: 10px;
            background: #f5f5f5;
            color: #333;
            border: none;
            outline: none;
            box-shadow: none;
            margin: 8px 0;
            font-size: 14px;
            letter-spacing: 1px;
            font-weight: 300;
          }
          
          section .container .user .formBx form input[type='submit'] {
            max-width: 100px;
            background: #677eff;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 1px;
            transition: 0.5s;
          }
          
          section .container .user .formBx form .signup {
            position: relative;
            margin-top: 20px;
            font-size: 12px;
            letter-spacing: 1px;
            color: #555;
            text-transform: uppercase;
            font-weight: 300;
          }
          
          section .container .user .formBx form .signup a {
            font-weight: 600;
            text-decoration: none;
            color: #677eff;
          }
          
          section .container .signupBx {
            pointer-events: none;
          }
          
          section .container.active .signupBx {
            pointer-events: initial;
          }
          
          section .container .signupBx .formBx {
            left: 100%;
          }
          
          section .container.active .signupBx .formBx {
            left: 0;
          }
          
          section .container .signupBx .imgBx {
            left: -100%;
          }
          
          section .container.active .signupBx .imgBx {
            left: 0%;
          }
          
          section .container .signinBx .formBx {
            left: 0%;
          }
          
          section .container.active .signinBx .formBx {
            left: 100%;
          }
          
          section .container .signinBx .imgBx {
            left: 0%;
          }
          
          section .container.active .signinBx .imgBx {
            left: -100%;
          }
          
          @media (max-width: 991px) {
            section .container {
              max-width: 400px;
            }
          
            section .container .imgBx {
              display: none;
            }
          
            section .container .user .formBx {
              width: 100%;
            }
          }
            section .container .user .formBx form .custom-select {
    position: relative;
    width: 100%;
    margin: 8px 0;
  }

  section .container .user .formBx form .custom-select select {
    width: 100%;
    padding: 10px;
    background: #f5f5f5;
    color: #333;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 300;
    appearance: none; /* Remove default arrow icon on Chrome/Safari */
    -webkit-appearance: none; /* Remove default arrow icon on Firefox */
  }

  section .container .user .formBx form .custom-select select::-ms-expand {
    display: none; /* Remove default arrow icon on IE 11 */
  }

  section .container .user .formBx form .custom-select::after {
    content: '\f107'; /* FontAwesome arrow down icon */
    font-family: 'FontAwesome';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }

  section .container .user .formBx form .custom-select select:focus {
    border: 2px solid #677eff;
  }
          
        `}
      </style>
      </div>
    </section>
    </>
  );
}

export default UserLogin;
