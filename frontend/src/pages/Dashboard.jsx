import { useNavigate } from "react-router-dom";

import {
  BrainCircuit,
  Sparkles,
  Video,
  BarChart3,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  let savedUser = {};

  try {
    const userData = localStorage.getItem("user");

    if (userData) {
      savedUser = JSON.parse(userData);
    }
  } catch (error) {
    console.log("Invalid user data");
  }

  const userName = savedUser.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  let interviews = [];

try {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    const userData = JSON.parse(savedUser);

    const historyKey = `interviewHistory_${userData.email}`;

    const savedHistory = localStorage.getItem(historyKey);

    if (savedHistory) {
      interviews = JSON.parse(savedHistory);
    }
  }
} catch (error) {
  console.log("Invalid interview history");
}

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="dashboard-brand">
          <div className="dashboard-logo">
            <BrainCircuit size={22} />
          </div>

          <span>
            HireMind <b>AI</b>
          </span>
        </div>

        <div className="dashboard-user">
          <div className="user-avatar">
            {userInitial}
          </div>

          <span>{userName}</span>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-welcome">
          <div>
            <div className="small-badge">
              <Sparkles size={14} />
              AI Interview Coach
            </div>

            <h1>
              Ready to ace your
              <span> next interview?</span>
            </h1>

            <p>
              Practice in a realistic interview environment
              and get AI-powered feedback on your performance.
            </p>
          </div>

          <button
            className="start-btn"
            onClick={() => navigate("/interview-setup")}
          >
            Start Interview
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">
              <Video size={22} />
            </div>

            <h3>Mock Interviews</h3>

            <p>
              Practice technical interviews with camera,
              microphone and screen recording.
            </p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <BarChart3 size={22} />
            </div>

            <h3>AI Analysis</h3>

            <p>
              Get detailed insights about communication,
              coding and problem-solving.
            </p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">
              <Clock3 size={22} />
            </div>

            <h3>Interview History</h3>

            <p>
              Review your previous interviews and track
              your improvement over time.
            </p>
          </div>
        </div>

        <div className="recent-section">
          <div className="section-heading">
            <div>
              <h2>Recent Interviews</h2>

              <p>
                Your latest interview sessions
              </p>
            </div>
          </div>

          {interviews.length === 0 && (
            <div className="empty-interviews">
              <div className="empty-icon">
                <Video size={24} />
              </div>

              <h3>No interviews yet</h3>

              <p>
                Start your first AI-powered mock interview
                to see your performance here.
              </p>

              <button
                onClick={() =>
                  navigate("/interview-setup")
                }
              >
                Start your first interview
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {interviews.length > 0 && (
            <div className="interview-history-list">
              {interviews.map((item) => (
                <div
                  className="interview-history-card"
                  key={item.id}
                >
                  <div className="history-left">
                    <div className="history-icon">
                      <Video size={20} />
                    </div>

                    <div>
                      <h3>{item.role}</h3>

                      <p>
                        {item.topic} · {item.difficulty}
                      </p>
                    </div>
                  </div>

                  <div className="history-middle">
                    <span>
                      <Clock3 size={15} />
                      {item.duration} min
                    </span>

                    <span>{item.company}</span>

                    <span>{item.date}</span>
                  </div>

                  <div className="history-status">
                    <CheckCircle2 size={16} />

                    <span>Completed</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;