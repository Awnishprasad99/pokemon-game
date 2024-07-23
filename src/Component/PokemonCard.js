import React, { useState, useEffect } from "react";
import "./PokemonCard.css";
import Swal from 'sweetalert2';

const PokemonCard = ({ name, image, type, health, isAcquired, onAcquire, onAdopt,adoptedBy}) => {
  const [currentHealth, setCurrentHealth] = useState(health);
  const [isAdopted, setIsAdopted] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [isReviveDisabled, setIsReviveDisabled] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const [isAddingHealth, setIsAddingHealth] = useState(false);
  // to disable the button
  
    
  useEffect(() => {
    let interval;
    if (isAdopted && currentHealth > 0) {
      interval = setInterval(() => {
        setCurrentHealth((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAdopted, currentHealth]);

  useEffect(() => {
    let interval;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    } else if (isAdopted) {
      setIsReviveDisabled(false);
    }
    return () => clearInterval(interval);
  }, [cooldown, isAdopted]);

  const handleAdopt = () => {
    setIsAdopted(true);
    onAdopt();
    Swal.fire({
      icon: 'success',
      title: 'Adopted!',
      text: `You have adopted ${name}`,
    });
    setClickedButton("adopt");
  };

  const handleFeed = () => {
    if (currentHealth === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Feed',
        text: `${name} is dead and cannot be fed.`,
      });
      return;
    }

    if (!isReviveDisabled) {
      if (currentHealth < health) {
        setCurrentHealth((prev) => prev + 1);
        Swal.fire({
          icon: 'success',
          title: 'Fed!',
          text: `You have fed ${name}`,
        });
        setClickedButton("feed");
        setIsReviveDisabled(true);
        setCooldown(10);
        setIsAddingHealth(true);
      }
    }
  };

  const toggleButtonLabel = () => {
    if (currentHealth === 0) {
      return "DEAD";
    } else {
      return isAddingHealth ? "Feeding Health" : "Feed";
    }
  };

  const healthPercentage = (currentHealth / health) * 100;

  return (
    <div className={`pokemon-card ${currentHealth === 0 ? 'pokemon-dead' : ''}`}>
      <img src={image} alt={name} className="pokemon-image" />
      <div className="pokemon-info">
        <h2 className="pokemon-name">{name}</h2>
        <p className="pokemon-type">Type: {type}</p>
        <div className="pokemon-health">
          <div className="health-bar">
            <div className="health-bar-inner" style={{ width: `${healthPercentage}%` }}></div>
          </div>
          <p>{currentHealth}/{health}</p>
        </div>
        {isAcquired ? (
          <>
            <button
              onClick={handleFeed}
              className={`button ${clickedButton === "feed" ? "button-clicked" : ""}`}
              disabled={isReviveDisabled || !isAdopted || currentHealth === 0}
            >
              {toggleButtonLabel()}
            </button>
            <button
              onClick={handleAdopt}
              className={`button ${clickedButton === "adopt" ? "button-clicked" : ""}`}
              disabled={isAdopted}
            >
              {isAdopted ? "Adopted!" : "Adopt"}
            </button>
          </>
        ) : (
          <button
            onClick={onAcquire}
            className="button"
          >
            Acquire
          </button>
        )}
        {isReviveDisabled && isAdopted && currentHealth > 0 && <p>Button reactivates in {cooldown} seconds</p>}
      </div>
    </div>
  );
};

export default PokemonCard;
