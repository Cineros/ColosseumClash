import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

import LandingPage from './pages/LandingPage/LandingPage';
import CardCreatorPage from './pages/CardCreatorPage/CardCreatorPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';

function App() {

    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/creator" element={<CardCreatorPage />} />
                    <Route path="/creator/:id" element={<CardCreatorPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                </Routes>
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
