import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile,} from "firebase/auth";

import { auth } from "../firebase/firebase";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

   try {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(
    userCredential.user,
    {
      displayName: name,
    }
  );

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userName", name);

  alert("Account Created Successfully!");

  navigate("/");

} catch (error) {

  console.error(error);

  alert(
    "Code: " + error.code +
    "\n\nMessage: " + error.message
  );

}

  };

    return (
    <section className="login-page">
      <div className="login-card">

        <h1>Create Account 🚀</h1>

        <p>Join Origin Store Today</p>

        <form onSubmit={handleSignup}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <label>Confirm Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="login-submit"
          >
            Create Account
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          <FcGoogle className="social-icon" />
          Continue with Google
        </button>

        <p className="signup-text">
          Already have an account?
          <Link to="/login">
            <span> Login</span>
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Signup;