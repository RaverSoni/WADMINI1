import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { signupService } from "../../../services/auth-services/signupService";
import { toast } from "react-hot-toast";
import { useData } from "../../../contexts/DataProvider";

export const Signup = () => {
  const { loading } = useData();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const { setAuth, loginHandler, error, setError } = useAuth();
  const navigate = useNavigate();

  const [signupCredential, setSignupCredential] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const signupHandler = async () => {
    try {
      setSignUpLoading(true);
      setError("");
      if (signupCredential.password === signupCredential.confirmPassword) {
        const response = await signupService(
          signupCredential.email,
          signupCredential.password,
          signupCredential.firstName,
          signupCredential.lastName
        );
        if (response.status === 201) {
          setSignUpLoading(false);
          toast.success(
            `Welcome, ${response.data.createdUser.firstName}! Your account has been created.`
          );
          const encodedToken = response.data.encodedToken;
          const firstName = response.data.createdUser.firstName;
          const lastName = response.data.createdUser.lastName;
          const email = response.data.createdUser.email;

          setAuth({
            token: encodedToken,
            isAuth: true,
            firstName,
            lastName,
            email,
          });

          localStorage.setItem("token", encodedToken);
          localStorage.setItem("isAuth", true);
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("email", email);

          navigate("/");
        }
      }
    } catch (error) {
      setSignUpLoading(false);
      setError(error.response.data.errors);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    !loading && (
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create Your Account</h2>
            <p>Join our community today</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signupHandler();
            }}
            className="signup-form"
          >
            <div className="name-fields">
              <div className="input-group">
                <label htmlFor="first-name">First Name</label>
                <input
                  id="first-name"
                  placeholder="John"
                  type="text"
                  className="auth-input"
                  onChange={(e) =>
                    setSignupCredential({
                      ...signupCredential,
                      firstName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="last-name">Last Name</label>
                <input
                  id="last-name"
                  placeholder="Doe"
                  type="text"
                  className="auth-input"
                  onChange={(e) =>
                    setSignupCredential({
                      ...signupCredential,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                placeholder="john.doe@example.com"
                type="email"
                className="auth-input"
                onChange={(e) =>
                  setSignupCredential({
                    ...signupCredential,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  placeholder="At least 8 characters"
                  type={hidePassword ? "password" : "text"}
                  className="auth-input"
                  minLength="8"
                  onChange={(e) =>
                    setSignupCredential({
                      ...signupCredential,
                      password: e.target.value,
                    })
                  }
                  required
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

            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-input">
                <input
                  id="confirm-password"
                  placeholder="Confirm your password"
                  type={hideConfirmPassword ? "password" : "text"}
                  className="auth-input"
                  minLength="8"
                  onChange={(e) =>
                    setSignupCredential({
                      ...signupCredential,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                >
                  {hideConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>

            <div className="terms-agreement">
              <label className="checkbox-container">
                <input type="checkbox" name="terms" required />
                <span>I agree to all Terms & Conditions</span>
              </label>
            </div>

            {error && <div className="error-message">{error[0]}</div>}

            <div className="button-group">
              <button
                type="submit"
                className="signup-button"
                disabled={signUpLoading}
              >
                {signUpLoading ? "Creating Account..." : "Sign Up"}
              </button>
              <button
                type="button"
                className="test-credentials-button"
                onClick={(e) => {
                  loginHandler(e, "AryanPotdar@apple.com", "AryanPotdar");
                }}
              >
                Use Test Credentials
              </button>
            </div>

            <div className="login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    )
  );
};