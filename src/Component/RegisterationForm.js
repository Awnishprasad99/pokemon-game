import React, { useState } from "react"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./RegisterationForm.css";
import { auth, db } from "./Firebase.js";
import { setDoc, doc } from "firebase/firestore";

const RegisterationForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: name
        });

        await setDoc(doc(db, "users", user.uid), {
          Name: name,
          email: user.email,
          phone: phone,
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
      });

      navigate("/game");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Invalid email or password',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container-contact-100">
      <div className="wrap-contact-100">
        <img
          src="https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png"
          alt="Pokemon Logo"
          className="pokemon-logo"
        />
        <form className="contact-100-form" onSubmit={handleSubmit}>
          <span className="contacts-us">
            <h1>Register form</h1>
          </span>
          <div className="wrap-input-100">
            <label htmlFor="name" className="label">Your Name</label>
            <input
              id="name"
              className="input-100"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="focus-input-100"></span>
          </div>
          <div className="wrap-input-100">
            <label htmlFor="email" className="label">Your Email</label>
            <input
              id="email"
              className="input-100"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <span className="focus-input-100"></span>
          </div>
          <div className="wrap-input-100">
            <label htmlFor="phone" className="label">Enter Your Phone No</label>
            <input
              id="phone"
              className="input-100"
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="off"
            />
            <span className="focus-input-100"></span>
          </div>
          <div className="wrap-input-100">
            <label htmlFor="password" className="label">Enter Your Password</label>
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
            <button className="submit-button" type="submit">
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
            </button>
          </div>
        </form>
        <p className="toggle-form">
          Already have an account?{" "}
          <span className="register" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterationForm;
