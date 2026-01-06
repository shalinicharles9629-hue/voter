import { useState } from "react";
import Vote from "../components/Vote";
import Result from "../components/Result";

function Dashboard({ setPage }) {
  const [showResult, setShowResult] = useState(false);
  const voterId = localStorage.getItem("currentUser");

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>🗳️ Voter Dashboard</h2>
          <p className="welcome-text">
            Welcome, <strong>{voterId}</strong>
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("currentUser");
            setPage("home");
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      {!showResult ? (
        <>
          <Vote setShowResult={setShowResult} />
        </>
      ) : (
        <>
          <Result />
        </>
      )}
    </div>
  );
}

export default Dashboard;
