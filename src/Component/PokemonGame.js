import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './pokemonGame.css';
import { auth, db } from './Firebase'; 
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import MyProfileDropdown from './MyProfileDropdown';
import { useNavigate } from 'react-router-dom';

const PokemonGame = () => {
  const [userName, setUserName] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserName = async (user) => {
      const userDoc = await getDoc(doc(db, "users", user.uid)); // Correct usage of getDoc for a single document
      if (userDoc.exists()) {
        setUserName(userDoc.data().Name);
      }
    };

    const fetchPokemonData = async () => {
      const querySnapshot = await getDocs(collection(db, "pokemons")); // Correct usage of getDocs for a collection
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPokemonData(data);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserName(user);
        fetchPokemonData();
      } else {
        setUserName('');
        setPokemonData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logout Successful',
          text: 'You have logged out successfully!',
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Logout Unsuccessful',
          text: 'Logout was unsuccessful!',
        });
      });
  };

  const handleAcquire = async (pokemonId, name) => {
    const user = auth.currentUser;
    if (!user) return;

    const pokemonDocRef = doc(db, "pokemons", pokemonId);
    const pokemonDoc = await getDoc(pokemonDocRef);

    if (pokemonDoc.exists() && pokemonDoc.data().adoptedBy) {
      Swal.fire({
        icon: 'error',
        title: 'Already Acquired!',
        text: `This Pokémon has already been acquired by another user.`,
      });
      return;
    }

    await updateDoc(pokemonDocRef, { adoptedBy: user.uid });

    Swal.fire({
      icon: 'success',
      title: 'Acquired!',
      text: `You have acquired ${name}`,
    });

    setPokemonData(prevData =>
      prevData.map(pokemon =>
        pokemon.id === pokemonId ? { ...pokemon, adoptedBy: user.uid } : pokemon
      )
    );

    navigate('/mypokemon');
  };

  return (
    <>
      <header className='header'>
        <h3 className='poki'>Pokemon Game</h3>
        <MyProfileDropdown userName={userName} onLogout={handleLogout} />
      </header>
      <div className='pokemon-container'>
        {pokemonData.map((pokemon, index) => (
          !pokemon.adoptedBy && (
            <PokemonCard 
              key={index} 
              name={pokemon.name} 
              image={pokemon.image} 
              type={pokemon.type} 
              health={pokemon.health} 
              onAcquire={() => handleAcquire(pokemon.id, pokemon.name)}
            />
          )
        ))}
      </div>
    </>
  );
}

export default PokemonGame;
