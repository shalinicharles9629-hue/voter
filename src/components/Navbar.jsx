function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => setPage("home")}>
        🗳️ SecureVote
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li onClick={() => setPage("home")}>Home</li>
        <li onClick={() => setPage("register")}>Register</li>
        <li onClick={() => setPage("login")}>Login</li>
        <li onClick={() => setPage("admin")}>Admin</li>

      </ul>
    </nav>
  );
}

export default Navbar;
