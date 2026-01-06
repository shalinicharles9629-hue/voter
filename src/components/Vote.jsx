import { useState } from "react";

function Vote({ setShowResult }) {
  const [selected, setSelected] = useState("");
  const [voted, setVoted] = useState(false);

  const candidates = ["Candidate A", "Candidate B", "Candidate C"];

  const handleVote = () => {
    if (!selected) {
      alert("Please select a candidate");
      return;
    }

    const votedUsers = JSON.parse(localStorage.getItem("votedUsers")) || [];
    const currentUser = localStorage.getItem("currentUser");

    if (votedUsers.includes(currentUser)) {
      alert("You have already voted!");
      setVoted(true);
      return;
    }

    votedUsers.push(currentUser);
    localStorage.setItem("votedUsers", JSON.stringify(votedUsers));

    const votes = JSON.parse(localStorage.getItem("votes")) || {};
    votes[selected] = (votes[selected] || 0) + 1;
    localStorage.setItem("votes", JSON.stringify(votes));

    alert("✅ Vote submitted successfully");
    setVoted(true);
  };

  return (
    <div className="vote-wrapper">
      <h2>🗳️ Cast Your Vote</h2>

      {!voted ? (
        <>
          <div className="candidate-list">
            {candidates.map((c, index) => (
              <div
                key={index}
                className={`candidate-card ${
                  selected === c ? "selected" : ""
                }`}
                onClick={() => setSelected(c)}
              >
                <input type="radio" checked={selected === c} readOnly />
                <span>{c}</span>
              </div>
            ))}
          </div>

          <button className="vote-btn" onClick={handleVote} disabled={voted}>
            Submit Vote
          </button>
        </>
      ) : (
        <>
          <h3>✅ Vote Completed</h3>
          <button
            className="vote-btn"
            onClick={() => setShowResult(true)}
          >
            View Result
          </button>
        </>
      )}
    </div>
  );
}

export default Vote;
