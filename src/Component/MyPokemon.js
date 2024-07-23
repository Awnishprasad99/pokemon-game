import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { auth, db } from './Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './MyPokemon.css';
import { useNavigate } from 'react-router-dom';

const MyPokemon = () => {
  const [adoptedPokemon, setAdoptedPokemon] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/game');
  };

  







  useEffect(() => {
    const fetchAdoptedPokemon = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        // Query Firestore to get Pokémon adopted by the current user
        const q = query(collection(db, "pokemons"), where("adoptedBy", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdoptedPokemon(data);
      } catch (error) {
        console.error("Error fetching adopted Pokémon: ", error);
      }
    };

    fetchAdoptedPokemon();
  }, []);

  const handleAdopt = async (pokemonId) => {
    console.log(`Adopted: ${pokemonId}`);
  };

  const handleFeed = (pokemonId) => {
    console.log(`Fed: ${pokemonId}`);
  };

  return (
    <div>
      <nav className='navbar'> 
        <h3>My Pokemon</h3>
        <button onClick={handleBack}>Back</button>
      </nav>
      <div className='content'>
        <div className='pokemon-container'>
          {adoptedPokemon.length > 0 ? (
            adoptedPokemon.map((pokemon, index) => (
              <PokemonCard 
                key={index} 
                name={pokemon.name} 
                image={pokemon.image} 
                type={pokemon.type} 
                health={pokemon.health} 
                isAcquired={true}
                onFeed={() => handleFeed(pokemon.id)}
                onAdopt={() => handleAdopt(pokemon.id)}
              />
            ))
          ) : (
            <p>No Pokémon adopted yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPokemon;
