
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  BrainCircuit,
  Eye,
  EyeOff,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    let users = [];

    try {
      const savedUsers = localStorage.getItem("users");

      if (savedUsers) {
        users = JSON.parse(savedUsers);
      }
    } catch (error) {
      console.log("Invalid users data");
      users = [];
    }

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password");
      return;
    }

    // Current logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: foundUser.name,
        email: foundUser.email,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <div className="auth-container">

        {/* LEFT SIDE */}
        <div className="auth-brand">

          <div className="brand-logo">
            <BrainCircuit size={30} />
          </div>

          <div className="brand-name">
            HireMind<span> AI</span>
          </div>

          <div className="brand-badge">
            <Sparkles size={15} />
            AI-Powered Interview Analysis
          </div>

          <h1>
            Practice smarter.
            <br />
            <span>Interview better.</span>
          </h1>

          <p>
            Simulate real technical interviews, analyze your
            performance and get personalized AI feedback.
          </p>

          <div className="feature-list">

            <div>
              <span>✓</span>
              Real-time interview recording
            </div>

            <div>
              <span>✓</span>
              AI-powered performance analysis
            </div>

            <div>
              <span>✓</span>
              Code & communication evaluation
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-card">

          <div className="auth-card-header">
            <h2>Welcome back</h2>
            <p>Continue your interview preparation</p>
          </div>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="input-group">

              <label>Email address</label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <div className="password-label">
                <label>Password</label>
                <span>Forgot?</span>
              </div>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* LOGIN BUTTON */}
            <button
              className="primary-btn"
              type="submit"
            >
              Sign in
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup">
              Create account
            </Link>
          </p>

        </div>

      </div>

      <div className="auth-footer">
        © 2026 HireMind AI · AI Mock Interview Analyzer
      </div>

    </div>
  );
}

export default Login;

