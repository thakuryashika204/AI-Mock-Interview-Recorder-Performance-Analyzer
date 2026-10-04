import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BrainCircuit,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  BookOpen,
  Gauge,
  Clock3,
  Sparkles,
} from "lucide-react";

function InterviewSetup() {
  const navigate = useNavigate();

  // ROLE → TOPICS
  const roleTopics = {
    "Frontend Developer": [
      "React",
      "JavaScript",
      "HTML & CSS",
      "Frontend APIs",
      "Data Structures & Algorithms",
    ],

    "Backend Developer": [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Databases",
      "System Design",
    ],

    "Full Stack Developer": [
      "MERN Stack",
      "React",
      "Node.js",
      "MongoDB",
      "REST APIs",
    ],

    "Software Engineer": [
      "Data Structures & Algorithms",
      "System Design",
      "Object Oriented Programming",
      "Databases",
      "Problem Solving",
    ],

    "Data Analyst": [
      "Python",
      "SQL",
      "Power BI",
      "Excel",
      "Statistics",
    ],

    "Data Scientist": [
      "Python",
      "Statistics",
      "Machine Learning",
      "Pandas",
      "Data Visualization",
    ],

    "AI / ML Engineer": [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Python",
    ],
  };

  const [role, setRole] = useState("Frontend Developer");
  const [company, setCompany] = useState("Any Company");
  const [topic, setTopic] = useState("React");
  const [difficulty, setDifficulty] = useState("Medium");
  const [duration, setDuration] = useState("30");

  // ROLE CHANGE
  const handleRoleChange = (newRole) => {
    setRole(newRole);

    // Role ke according first relevant topic select hoga
    const topics = roleTopics[newRole];

    if (topics && topics.length > 0) {
      setTopic(topics[0]);
    }
  };

  const handleStart = () => {
    const interviewData = {
      role,
      company,
      topic,
      difficulty,
      duration,
    };

    localStorage.setItem(
      "interviewSetup",
      JSON.stringify(interviewData)
    );

    navigate("/interview");
  };

  const topics = roleTopics[role] || [];

  return (
    <div className="setup-page">

      {/* NAVBAR */}
      <nav className="setup-nav">
        <div className="setup-brand">
          <div className="setup-logo">
            <BrainCircuit size={22} />
          </div>

          <span>
            HireMind <b>AI</b>
          </span>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="setup-content">

        {/* HEADING */}
        <div className="setup-heading">

          <div className="setup-badge">
            <Sparkles size={14} />
            AI Interview Coach
          </div>

          <h1>
            Set up your
            <span> mock interview</span>
          </h1>

          <p>
            Customize your interview experience before you begin.
            Choose your role, topic and difficulty level.
          </p>

        </div>

        {/* SETUP LAYOUT */}
        <div className="setup-layout">

          {/* LEFT FORM */}
          <div className="setup-card">

            <div className="setup-card-header">
              <h2>Interview Preferences</h2>
              <p>Tell us what you want to practice</p>
            </div>

            {/* JOB ROLE */}
            <div className="setup-field">

              <label>
                <BriefcaseBusiness size={16} />
                Job Role
              </label>

              <select
                value={role}
                onChange={(e) =>
                  handleRoleChange(e.target.value)
                }
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Software Engineer</option>
                <option>Data Analyst</option>
                <option>Data Scientist</option>
                <option>AI / ML Engineer</option>
              </select>

            </div>

            {/* COMPANY */}
            <div className="setup-field">

              <label>
                <Building2 size={16} />
                Company
              </label>

              <select
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
              >
                <option>Any Company</option>
                <option>Google</option>
                <option>Microsoft</option>
                <option>Amazon</option>
                <option>Meta</option>
                <option>Startup</option>
              </select>

            </div>

            {/* TOPIC */}
            <div className="setup-field">

              <label>
                <BookOpen size={16} />
                Interview Topic
              </label>

              <select
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
              >
                {topics.map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* DIFFICULTY */}
            <div className="setup-field">

              <label>
                <Gauge size={16} />
                Difficulty
              </label>

              <div className="difficulty-options">

                {["Easy", "Medium", "Hard"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={
                      difficulty === level
                        ? "difficulty-btn active"
                        : "difficulty-btn"
                    }
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </button>
                ))}

              </div>

            </div>

            {/* DURATION */}
            <div className="setup-field">

              <label>
                <Clock3 size={16} />
                Interview Duration
              </label>

              <div className="duration-options">

                {["15", "30", "45", "60"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={
                      duration === time
                        ? "duration-btn active"
                        : "duration-btn"
                    }
                    onClick={() => setDuration(time)}
                  >
                    {time} min
                  </button>
                ))}

              </div>

            </div>

            {/* START INTERVIEW */}
            <button
              className="begin-interview-btn"
              type="button"
              onClick={handleStart}
            >
              Start Interview
              <ArrowRight size={19} />
            </button>

          </div>

          {/* RIGHT PREVIEW */}
          <div className="setup-preview">

            <div className="preview-glow"></div>

            <div className="preview-icon">
              <BrainCircuit size={34} />
            </div>

            <div className="preview-label">
              YOUR INTERVIEW
            </div>

            <h2>{role}</h2>

            <p>
              {topic} · {difficulty} · {duration} minutes
            </p>

            <div className="preview-divider"></div>

            <div className="preview-info">

              <div>
                <span>Company</span>
                <strong>{company}</strong>
              </div>

              <div>
                <span>Focus</span>
                <strong>{topic}</strong>
              </div>

              <div>
                <span>Level</span>
                <strong>{difficulty}</strong>
              </div>

            </div>

            <div className="preview-tip">
              <Sparkles size={16} />

              <span>
                AI will adapt questions based on your responses.
              </span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default InterviewSetup;