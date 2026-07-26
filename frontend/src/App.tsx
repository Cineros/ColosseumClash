import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {

    const [cards, setCards] = useState([]);

    useEffect(() => {

        fetch("http://localhost:4000/cards")
            .then(r => r.json())
            .then(setCards);

    }, []);

    return (
        <div>
            <Navbar />

            <LandingPage />
            <Footer />
            {cards.map((card:any) =>

                <div key={card.id}>
                    {card.title}
                </div>

            )}
        </div>
    );

}

export default App
