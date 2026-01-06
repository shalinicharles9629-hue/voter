function Result() {
  const votes = JSON.parse(localStorage.getItem("votes")) || {};

  const candidates = Object.keys(votes);
  const totalVotes = Object.values(votes).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="card">
      <h3 style={{ color: "#1e3a8a", marginBottom: "20px" }}>
        📊 Election Results
      </h3>

      {totalVotes === 0 ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>
          No votes cast yet
        </p>
      ) : (
        candidates.map((candidate) => {
          const count = votes[candidate];
          const percentage = ((count / totalVotes) * 100).toFixed(1);

          return (
            <div key={candidate} style={{ marginBottom: "18px" }}>
              {/* Candidate Name */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <span>{candidate}</span>
                <span>{percentage}%</span>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: "10px",
                  background: "#e5e7eb",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #2563eb, #1e40af)",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  marginTop: "4px",
                }}
              >
                {count} votes
              </p>
            </div>
          );
        })
      )}

      {/* Footer */}
      {totalVotes > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "13px",
            color: "#475569",
          }}
        >
          🗳️ Total Votes: <strong>{totalVotes}</strong>
        </p>
      )}
    </div>
  );
}

export default Result;
