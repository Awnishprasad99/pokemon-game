import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ReactContact from './Component/ReactContact';
import RegisterationForm from './Component/RegisterationForm';
import PokemonGame from './Component/PokemonGame'; // Import your Pokemon game component
import MyPokemon from './Component/MyPokemon'; // Import your MyPokemon component
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterationForm />} />
        <Route path="/login" element={<ReactContact />} />
        <Route path="/game" element={<PokemonGame />} />
        <Route path="/mypokemon" element={<MyPokemon />} /> {/* Make sure this path is lowercase */}
      </Routes>
    </Router>
  );
};

export default App;
