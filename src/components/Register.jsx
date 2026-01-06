function Register({ setPage }) {
  const handleRegister = (e) => {
    e.preventDefault();

    const voterId = e.target.voterId.value.trim();
    const password = e.target.password.value.trim();

    const voters = JSON.parse(localStorage.getItem("voters")) || [];

    const exists = voters.find(v => v.voterId === voterId);
    if (exists) {
      alert("Voter already registered");
      return;
    }

    voters.push({
      voterId,
      password,
      hasVoted: false
    });

    localStorage.setItem("voters", JSON.stringify(voters));

    alert("Registration Successful");
    setPage("login");
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>🗳️ Voter Registration</h2>

        <div className="input-group">
          <label>Voter ID</label>
          <input type="text" name="voterId" required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" required />
        </div>

        <button className="primary-btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
