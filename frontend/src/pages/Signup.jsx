import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  let users = [];

  try {
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }
  } catch (error) {
    users = [];
  }

  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    alert("Account already exists with this email");
    return;
  }

  const newUser = {
    name,
    email,
    password,
  };

  users.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  // Current logged-in user
  localStorage.setItem(
    "user",
    JSON.stringify({
      name,
      email,
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
            Start your AI interview journey
          </div>

          <h1>
            Build confidence.
            <br />
            <span>Get interview ready.</span>
          </h1>

          <p>
            Create your account and practice realistic technical
            interviews with AI-powered performance analysis.
          </p>

          <div className="feature-list">

            <div>
              <span>✓</span>
              Realistic mock interview experience
            </div>

            <div>
              <span>✓</span>
              Technical & communication analysis
            </div>

            <div>
              <span>✓</span>
              Personalized improvement feedback
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-card">

          <div className="auth-card-header">
            <h2>Create account</h2>
            <p>Start your AI-powered interview preparation</p>
          </div>

          <form onSubmit={handleSignup}>

            {/* NAME */}
            <div className="input-group">

              <label>Full name</label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  type="text"
                  placeholder="Yashika Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

            </div>

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

              <label>Password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group">

              <label>Confirm password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />
              </div>

            </div>

            <button
              className="primary-btn"
              type="submit"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="signup-text">
            Already have an account?{" "}
            <Link to="/">
              Sign in
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

export default Signup;