import React, { useState } from 'react';
import axios from "axios";
import './Login.css'; // Import the CSS file
import { Link,useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [token, setToken] = useState('');
  const navigateTo = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/ziad/auth/login', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = response.data.token;
      const userId = response.data.userId; // Get userId from response
      console.log("repsone ",response.data);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Store userId in local storage
      console.log(localStorage);
      navigateTo('/');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid email or password.');
      } else if (error.response && error.response.status === 500) {
        setLoginError('Internal server error. Please try again later.');
      } else {
        setLoginError('An unknown error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
        {loginError && <p className="error">{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
