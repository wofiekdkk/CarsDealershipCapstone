import React, { useState } from "react";
import "./Register.css";
import Header from "../Header/Header";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const response = await fetch(
        window.location.origin + "/djangoapp/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userName,
            firstName,
            lastName,
            email,
            password
          })
        }
      );

      const result = await response.json();

      if (response.ok && result.status === 200) {
        setMessage("Registration successful! You can now log in.");
      } else {
        setMessage(result.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Unable to connect to the registration server.");
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container">
        <h1 className="header">Sign-up</h1>

        <form onSubmit={register} className="inputs">
          <input
            className="input_field"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            className="input_field"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            className="input_field"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            className="input_field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input_field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="submit_panel">
            <button className="submit" type="submit">
              Register
            </button>
          </div>

          <p>{message}</p>
          <a href="/login">Already registered? Login</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
