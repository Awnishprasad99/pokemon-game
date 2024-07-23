import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReactContact.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import Swal from 'sweetalert2';

const ReactContact = () => {
  const navigate = useNavigate();

  // State variables for form inputs and submission state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have logged in successfully!',
      });
      navigate('/game'); // Redirect to the game page
    } catch (error) {
      console.error('Login failed:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password',
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state after submission
    }
  };

  return (
    <div className="container-contact-100">
      <div className="wrap-contact-100">
        <img
          src="https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png"
          alt="Pokemon Logo"
        />
        <form className="contact-100-form" onSubmit={handleSubmit}>
          <span className="contacts-us">
            <h1>Login Form</h1>
          </span>
          <div className="wrap-input-100">
            <label htmlFor="email" className="label">Email:</label>
            <input
              id="email"
              className="input-100"
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="focus-input-100"></span>
          </div>
          <div className="wrap-input-100">
            <label htmlFor="password" className="label">Password:</label>
            <input
              id="password"
              className="input-100"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <span className="focus-input-100"></span>
          </div>
          <div className="wrap-input-100">
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
            </button>
          </div>
        </form>
        <p className="toggle-form">
          Don't have an account?{' '}
          <span className="register" onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default ReactContact;
