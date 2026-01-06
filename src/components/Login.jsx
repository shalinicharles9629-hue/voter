import { useState } from "react";

/* 🔐 Random OTP Generator */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function Login({ setPage }) {
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  // STEP 1: ID + PASSWORD CHECK
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("voters")) || [];

    const userExists = users.find(
      (u) => u.voterId === voterId && u.password === password
    );

    if (!userExists) {
      alert("❌ Invalid Voter ID or Password");
      return;
    }

    // STEP 2: RANDOM OTP GENERATE
    const otp = generateOTP();
    localStorage.setItem("generatedOTP", otp);
    localStorage.setItem("currentUser", voterId);

    alert("📩 Your OTP is: " + otp); // demo purpose
    setOtpSent(true);
  };

  // STEP 3: OTP VERIFY
  const handleVerifyOtp = () => {
    const savedOtp = localStorage.getItem("generatedOTP");

    if (otpInput === savedOtp) {
      alert("✅ Login Successful");
      localStorage.removeItem("generatedOTP");
      setPage("dashboard");
    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>🔐 Voter Login</h2>

        {!otpSent ? (
          <>
            <div className="input-group">
              <label>Voter ID</label>
              <input
                type="text"
                placeholder="Enter Voter ID"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="primary-btn" onClick={handleLogin}>
              Login & Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="input-group">
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="6 Digit OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
            </div>

            <button className="primary-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
