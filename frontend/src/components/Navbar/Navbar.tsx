import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          CardForge
        </a>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <a href="/gallery">Gallery</a>
          <a href="../../../CardCreatorPage.tsx">Card Creator</a>

          <button className="login-button">
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
