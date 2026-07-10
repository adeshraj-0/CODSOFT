import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const userCredential =
  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userEmail", userCredential.user.email);
localStorage.setItem(
  "userName",
  userCredential.user.displayName || "User"
);
      const user = auth.currentUser;

localStorage.setItem(
  "userName",
  user?.displayName || "User"
);

      alert("Login Successful!");

      navigate("/");

    } catch (error) {

      alert("Invalid Email or Password");

    }
  };

  return (
    <section className="login-page">
      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Sign in to your Origin Store account</p>

        <form onSubmit={handleLogin}>

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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

          <div className="login-options">

            <label className="remember-me">

              <input type="checkbox" />

              Remember Me

            </label>

            <a href="#">
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-login">

          <button className="google-btn">
            <FcGoogle className="social-icon" />
            Continue with Google
          </button>

        </div>

        <p className="signup-text">
          Don't have an account?

          <Link to="/signup">
            <span> Sign Up</span>
          </Link>

        </p>

      </div>
    </section>
  );
}

export default Login;