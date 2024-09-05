import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CharacterComponent from './components/Character';
import SkillComponent from './components/Skill';
import AspectComponent from './components/Aspect';
import ItemComponent from './components/Item';
import ManeuverComponent from './components/Maneuver';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<CharacterComponent />} />
                <Route path="/skills" element={<SkillComponent />} />
                <Route path="/aspects" element={<AspectComponent />} />
                <Route path="/items" element={<ItemComponent />} />
                <Route path="/maneuvers" element={<ManeuverComponent />} />
            </Routes>
        </Router>
    );
};

export default App;

