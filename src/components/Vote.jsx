import { useState, useEffect } from "react";

function Vote({ setPage }) {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [showAlreadyVotedMsg, setShowAlreadyVotedMsg] = useState(false);
  const [electionStatus, setElectionStatus] = useState("CLOSED");

  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    // Load candidates added by admin
    const storedCandidates =
      JSON.parse(localStorage.getItem("candidates")) || [];
    setCandidates(storedCandidates);

    // Load election status
    setElectionStatus(localStorage.getItem("electionStatus") || "CLOSED");

    // Check if user already voted (ONLY FLAG, NO MESSAGE)
    const votedUsers =
      JSON.parse(localStorage.getItem("votedUsers")) || [];
    if (votedUsers.includes(currentUser)) {
      setHasVoted(true);
    }
  }, [currentUser]);

  const handleVote = () => {
    // Election closed check
    if (electionStatus !== "OPEN") {
      alert("❌ Election is not active");
      return;
    }

    // Already voted → show message ONLY on click
    if (hasVoted) {
      setShowAlreadyVotedMsg(true);
      return;
    }

    // No candidate selected
    if (!selected) {
      alert("⚠️ Please select a candidate");
      return;
    }

    // Mark user as voted
    const votedUsers =
      JSON.parse(localStorage.getItem("votedUsers")) || [];
    votedUsers.push(currentUser);
    localStorage.setItem("votedUsers", JSON.stringify(votedUsers));

    // Update candidate votes
    const updatedCandidates = candidates.map((c) =>
      c.name === selected ? { ...c, votes: c.votes + 1 } : c
    );
    localStorage.setItem(
      "candidates",
      JSON.stringify(updatedCandidates)
    );

    setCandidates(updatedCandidates);
    setHasVoted(true);

    alert("✅ Vote submitted successfully");

    // Optional: logout after vote
    localStorage.removeItem("currentUser");
    setPage("home");
  };

  return (
    <div className="vote-wrapper">
      <h2>🗳️ Cast Your Vote</h2>

      <p className="vote-subtitle">
        Election Status:{" "}
        <strong
          style={{
            color: electionStatus === "OPEN" ? "green" : "red",
          }}
        >
          {electionStatus}
        </strong>
      </p>

      {/* Message ONLY after clicking submit again */}
      {showAlreadyVotedMsg && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          ❌ You have already voted
        </p>
      )}

      <div className="candidate-list">
        {candidates.length === 0 && (
          <p>No candidates available</p>
        )}

        {candidates.map((c, index) => (
          <div
            key={index}
            className={`candidate-card ${
              selected === c.name ? "selected" : ""
            }`}
            onClick={() => {
              if (!hasVoted) setSelected(c.name);
            }}
          >
            <input
              type="radio"
              checked={selected === c.name}
              readOnly
            />
            <span>{c.name}</span>
          </div>
        ))}
      </div>

      <button
        className="vote-btn"
        onClick={handleVote}
        style={{
          opacity: electionStatus !== "OPEN" ? 0.6 : 1,
        }}
      >
        Submit Vote
      </button>
    </div>
  );
}

export default Vote;
