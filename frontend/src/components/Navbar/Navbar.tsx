import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    CardForge
                </Link>

                <button
                    className="navbar-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    ☰
                </button>

                <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    <Link to="/gallery">Gallery</Link>

                    <Link to="/creator">Card Creator</Link>

                    <button className="login-button">Login</button>
                </nav>
            </div>
        </header>
    );
}
