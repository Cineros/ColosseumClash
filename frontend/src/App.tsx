import { useEffect, useState } from 'react'
import './App.css'

function App() {

    const [cards, setCards] = useState([]);

    useEffect(() => {

        fetch("http://localhost:4000/cards")
            .then(r => r.json())
            .then(setCards);

    }, []);

    return (
        <div>
            {cards.map((card:any)=>

                <div key={card.id}>
                    {card.title}
                </div>

            )}
        </div>
    );

}

export default App
