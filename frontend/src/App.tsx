import { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

import LandingPage from './pages/LandingPage/LandingPage';
import CardCreatorPage from './pages/CardCreatorPage/CardCreatorPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';

function App() {
    const [cards, setCards] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/cards')
            .then((r) => r.json())
            .then(setCards);
    }, []);

    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/creator" element={<CardCreatorPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                </Routes>
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
