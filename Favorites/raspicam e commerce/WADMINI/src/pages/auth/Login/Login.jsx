import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { useData } from "../../../contexts/DataProvider";

export const Login = () => {
  const { loading } = useData();
  const [hidePassword, setHidePassword] = useState(true);
  const { error, loginCredential, setLoginCredential, loginHandler } = useAuth();
  const { email, password } = loginCredential;

  return (
    !loading && (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to login</p>
          </div>
          
          <form onSubmit={(e) => loginHandler(e, email, password)} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                value={email}
                required
                onChange={(e) => setLoginCredential({
                  ...loginCredential,
                  email: e.target.value
                })}
                id="email"
                placeholder="Enter your email"
                type="email"
                className="auth-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  value={password}
                  required
                  onChange={(e) => setLoginCredential({
                    ...loginCredential,
                    password: e.target.value
                  })}
                  id="password"
                  placeholder="Enter your password"
                  type={hidePassword ? "password" : "text"}
                  className="auth-input"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setHidePassword(!hidePassword)}
                >
                  {hidePassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" name="remember-me" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <button type="submit" className="login-button">
                Sign In
              </button>
              <button
                type="button"
                className="test-credentials-button"
                onClick={(e) => {
                  loginHandler(e, "aryanpotdar2003@gmail.com", "1234567890");
                }}
              >
                Use Test Credentials
              </button>
            </div>

            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    )
  );
};