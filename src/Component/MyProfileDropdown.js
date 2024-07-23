import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import "./MyProfileDropdown.css";

const MyProfileDropdown = ({ userName, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

const handleMouseEnter =()=>{
  setIsDropdownOpen(true);
}

const handleMouseLeave =()=>{

  setIsDropdownOpen(false)
}

  const handleMyPokemon = () => {
    navigate('/mypokemon'); // Navigate to the MyPokemon page
  };

  return (
    <div className="my-profile-dropdown"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    
    >
      <button onClick={toggleDropdown} className="my-profile-button">
        My Profile
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <p className="user-name">{userName}</p>
          <button onClick={handleMyPokemon} className="mypokemon-button">
            My Pokemon
          </button>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfileDropdown;
