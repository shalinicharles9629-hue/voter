import { useState, useEffect } from "react";

function AdminDashboard({ setPage }) {
  const [candidate, setCandidate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [electionStatus, setElectionStatus] = useState("CLOSED");

  useEffect(() => {
    setCandidates(JSON.parse(localStorage.getItem("candidates")) || []);
    setElectionStatus(localStorage.getItem("electionStatus") || "CLOSED");
  }, []);

  const addCandidate = () => {
    if (!candidate) return alert("Enter candidate name");

    const updated = [...candidates, { name: candidate, votes: 0 }];
    setCandidates(updated);
    localStorage.setItem("candidates", JSON.stringify(updated));
    setCandidate("");
  };

  const toggleElection = () => {
    const status = electionStatus === "OPEN" ? "CLOSED" : "OPEN";
    setElectionStatus(status);
    localStorage.setItem("electionStatus", status);
  };

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    setPage("home");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2>🧑‍💼 Admin Dashboard</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="dashboard-card">
        <h3>Election Status: {electionStatus}</h3>
        <button className="primary-btn" onClick={toggleElection}>
          {electionStatus === "OPEN" ? "End Election" : "Start Election"}
        </button>
      </div>

      <div className="dashboard-card">
        <h3>Add Candidate</h3>
        <input
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          placeholder="Candidate Name"
        />
        <button className="primary-btn" onClick={addCandidate}>
          Add
        </button>

        <ul>
          {candidates.map((c, i) => (
            <li key={i}>
              {c.name} — {c.votes} votes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
