import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="login-page">
      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Sign in to your Origin Store account</p>

        <form>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
          <span> Sign Up</span>
        </p>

      </div>
    </section>
  );
}

export default Login;