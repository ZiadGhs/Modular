import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Register.css'
// import { UserContext } from './UserContext'; // Uncomment and use if needed

function Register() {
  const navigateTo = useNavigate();
  const location = useLocation();
  // const { setUserId, setEmail } = React.useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const firstNameRef = useRef(null);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
        firstNameRef.current.focus();
      }, 3000);
    }
  }, [successMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/ziad/auth/register", formData);
      console.log(response.data.data);
      // const userId = response.data.data.userId;
     // const email = response.data.data.email;
      // setUserId(userId);
      // setEmail(email);
      setSuccessMessage("Registration successful!");
      setErrorMessage(null);
      //navigateTo('/Verification', { state: { userId } });
      navigateTo('/')
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <p className="fname">First Name</p>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          ref={firstNameRef}
          placeholder="John"
          required
          autoComplete="off"
        />

        <div className="lname">
          <p className="pReg">Last Name</p>
          <div className="lni">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="email">
          <p className="pReg">Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@client.com"
            required
            autoComplete="off"
          />
        </div>

        <p className="pReg">Password</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <br />
        <p className="pReg">Age</p>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <div style={{ display: "flex" }}>
          <button type="submit" className="btnreg" style={{ marginRight: 10 }}>
            Create Account
          </button>
        </div>
        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <p>Already Registered? <Link to="/login">Login here</Link>.</p>
      </form>
    </div>
  );
}

export default Register;
