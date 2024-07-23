// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPEBDZ2GJ_O-VEtFLNRUk6eazX_KAa9nk",
  authDomain: "login-auth-79d5e.firebaseapp.com",
  projectId: "login-auth-79d5e",
  storageBucket: "login-auth-79d5e.appspot.com",
  messagingSenderId: "388645673536",
  appId: "1:388645673536:web:db7c096ff9d6434ade9da5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

// Pokémon data to be added to Firestore
const pokemonData = [
  {
    id: "001",
    name: "Bulbasaur",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    type: "Grass",
    health: 45,
    adoptedBy: ""
  },
  {
    id: "004",
    name: "Charmander",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    type: "Fire",
    health: 39,
    adoptedBy: ""
  },
  {
    id: "007",
    name: "Squirtle",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    type: "Water",
    health: 44,
    adoptedBy: ""
  },
  {
    id: "025",
    name: "Pikachu",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    type: "Electric",
    health: 35,
    adoptedBy: ""
  },
  {
    id: "039",
    name: "Jigglypuff",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png",
    type: "Normal",
    health: 115,
    adoptedBy: ""
  },
  {
    id: "052",
    name: "Meowth",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png",
    type: "Normal",
    health: 40,
    adoptedBy: ""
  },
  {
    id: "054",
    name: "Psyduck",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png",
    type: "Water",
    health: 50,
    adoptedBy: ""
  },

 
];

// Function to initialize Firestore with Pokémon data
const initializeFirestore = async () => {
  try {
    for (const pokemon of pokemonData) {
      const pokemonDoc = doc(db, "pokemons", pokemon.id);
      await setDoc(pokemonDoc, pokemon);
      console.log(`Added ${pokemon.name} to Firestore`);
    }
    console.log("All Pokémon data has been added to Firestore");
  } catch (error) {
    console.error("Error adding Pokémon data to Firestore: ", error);
  }
};

// Call the function to initialize Firestore
initializeFirestore();


