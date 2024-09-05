import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Atomic D20 App</h1>
            <nav>
                <ul>
                    <li><Link to="/characters">Characters</Link></li>
                    <li><Link to="/skills">Skills</Link></li>
                    <li><Link to="/aspects">Aspects</Link></li>
                    <li><Link to="/items">Items</Link></li>
                    <li><Link to="/maneuvers">Maneuvers</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;

