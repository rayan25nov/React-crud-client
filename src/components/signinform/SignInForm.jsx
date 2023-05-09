import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../modal/ErrorModal";
import SignupModal from "../modal/SignupModal";
import Classes from "./SignInForm.module.css";

const SignInForm = ({ setIsAuthenticated }) => {
  const api = process.env.API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSignIn, setShowSignIn] = useState(true);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}, Password: ${password}`);
    // Send request to server for authentication using email and password
    try {
      const response = await fetch(`${api}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      const token = data.token;

      if (response.ok) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        // console.log(data.token);
        navigate("/userdata"); // navigate to the CRUD page
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    // console.log(
    //   "Sign up form submitted " + name + " " + email + " " + password
    // );
    // Send request to server to create new user using the form data
    try {
      const response = await fetch(`${api}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      } else {
        setIsSignUpSuccessful(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleForm = () => {
    setShowSignIn((prev) => !prev);
    // console.log(showSignIn);
  };

  return (
    <div>
      {error && <ErrorModal onClose={() => setError("")}>{error}</ErrorModal>}
      {isSignUpSuccessful ? (
        <SignupModal />
      ) : (
        <div className={Classes.signInForm}>
          {showSignIn && (
            <form onSubmit={handleSignIn}>
              <h1>Sign In</h1>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign In</button>
              <p>Don't have an account?</p>
              <button onClick={toggleForm}>Sign Up</button>
            </form>
          )}
          {!showSignIn && (
            <form onSubmit={handleSignUp}>
              <h2>Sign Up</h2>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required={true}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  required={true}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required={true}
                />
              </div>
              <button type="submit">Sign Up</button>
              <p>Already have an account?</p>
              <button onClick={toggleForm}>Sign In</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default SignInForm;
