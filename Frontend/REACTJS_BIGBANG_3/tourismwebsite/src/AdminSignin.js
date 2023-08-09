import React, { useState } from 'react';
import axios from 'axios';
import { variables } from './Variable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminSignin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${variables.API_URL}Token/Admin`, {
        admin_Name: username,
        admin_Password: password,
      });
  
      const token = response.data;
      console.log('Generated Token:', token);
      // Store the token in the local storage
      localStorage.setItem('adminToken', token);
  
      // Set a timeout of 2 seconds to automatically delete the token
      setTimeout(() => {
        localStorage.removeItem('adminToken');
        console.log('Token has been automatically deleted after 6 seconds.');
      }, 5 * 60 * 1000);

      // Display a toast notification for successful login
      toast.success('Login Successful', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate('/approve');

    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');

      // Display a toast notification for login error
      toast.error('Invalid username or password', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">ADMIN PANEL</div>

          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                  {error && <div className="login-text" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <div className="login-button">
          <button type="submit" className="btn btn-outline-primary">
            LOGIN
          </button>
        </div>
      </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
      <style>
        {`
        body {
            background: #222D32;
            font-family: 'Roboto', sans-serif;
        }
        
        .login-box {
            margin-top: 75px;
            height: auto;
            background: #1A2226;
            text-align: center;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        }
        
        .login-key {
            height: 100px;
            font-size: 80px;
            line-height: 100px;
            background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .login-title {
            margin-top: 15px;
            text-align: center;
            font-size: 30px;
            letter-spacing: 2px;
            margin-top: 15px;
            font-weight: bold;
            color: #ECF0F5;
        }
        
        .login-form {
            margin-top: 25px;
            text-align: left;
        }
        
        input[type=text] {
            background-color: #1A2226;
            border: none;
            border-bottom: 2px solid #0DB8DE;
            border-top: 0px;
            border-radius: 0px;
            font-weight: bold;
            outline: 0;
            margin-bottom: 20px;
            padding-left: 0px;
            color: #ECF0F5;
        }
        
        input[type=password] {
            background-color: #1A2226;
            border: none;
            border-bottom: 2px solid #0DB8DE;
            border-top: 0px;
            border-radius: 0px;
            font-weight: bold;
            outline: 0;
            padding-left: 0px;
            margin-bottom: 20px;
            color: #ECF0F5;
        }
        
        .form-group {
            margin-bottom: 40px;
            outline: 0px;
        }
        
        .form-control:focus {
            border-color: inherit;
            -webkit-box-shadow: none;
            box-shadow: none;
            border-bottom: 2px solid #0DB8DE;
            outline: 0;
            background-color: #1A2226;
            color: #ECF0F5;
        }
        
        input:focus {
            outline: none;
            box-shadow: 0 0 0;
        }
        
        label {
            margin-bottom: 0px;
        }
        
        .form-control-label {
            font-size: 10px;
            color: #6C6C6C;
            font-weight: bold;
            letter-spacing: 1px;
        }
        
        .btn-outline-primary {
            border-color: #0DB8DE;
            color: #0DB8DE;
            border-radius: 0px;
            font-weight: bold;
            letter-spacing: 1px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
        
        .btn-outline-primary:hover {
            background-color: #0DB8DE;
            right: 0px;
        }
        
        .login-btm {
            float: left;
        }
        
        .login-button {
            padding-right: 0px;
            text-align: right;
            margin-bottom: 25px;
        }
        
        .login-text {
            text-align: left;
            padding-left: 0px;
            color: #A2A4A4;
        }
        
        .loginbttm {
            padding: 0px;
        }
        `}
      </style>
      <ToastContainer />
    </div>
    
  );
};

export default AdminSignin;
