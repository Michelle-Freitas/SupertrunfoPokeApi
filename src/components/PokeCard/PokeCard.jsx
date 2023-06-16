import "./styles.css";

import { useState, useEffect, useRef } from "react";
import { Button } from "../Button/Button";
import { Loading } from "../Loading/Loading";

export function PokeCard({ player, pokemon, toggleBattle }) {
  let pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  const [removeLoading, setRemoveLoading] = useState(false);
  const optionChecked = useRef();
  const choice = useRef();
  const [playerValue, setPlayerValue] = useState();
  const [pokemonType, setPokemonType] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [checkDisabled, setCheckDisabled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPokemonType(pokemon.types[0].type.name);
    }, 1000);

    setTimeout(() => {
      setRemoveLoading(true);
    }, 2000);

    if (player !== "Jogador") {
      setCheckDisabled(true);
    }
  }, [player, pokemon.types, removeLoading]);

  function handleChecked(e) {
    optionChecked.current = {
      option: e.target.id,
      value: e.target.value,
    };
    setPlayerValue(optionChecked.current);
    choice.current = optionChecked.current.option;

    if (optionChecked.current !== "") {
      setBtnDisabled(false);
    }
  }

  function battle() {
    // console.log('player: '+ playerValue.option)
    // console.log('player: '+ playerValue.value)
    // console.log('choice: ' + choice.current)
    // console.log('playerValue ', playerValue)

    setBtnDisabled(true);
    setCheckDisabled(true);
    toggleBattle();
  }

  return (
    <>
      {removeLoading ? (
        <div className={`pokecard ${pokemonType}`}>
          <h2 className="player">{player}</h2>
          <h3>{pokemon.name}</h3>
          <p>
            <small>#{pokemon.id}</small> - <small>{pokemonType}</small>
          </p>
          <img className="img-pokemon" src={pokemonImg} alt="Pokemon" />

          <form action="pokemonChoosed">
            <label htmlFor="base_experience">
              <input
                type="radio"
                name="option"
                id="base_experience"
                value={pokemon.base_experience}
                onClick={handleChecked}
                disabled={checkDisabled}
              />
              <span className="option">Expêriencia:</span>{" "}
              <span className="value">{pokemon.base_experience}</span>
            </label>
            <label htmlFor="height">
              <input
                type="radio"
                name="option"
                id="height"
                value={pokemon.height}
                onClick={handleChecked}
                disabled={checkDisabled}
              />
              <span className="option">Altura:</span>{" "}
              <span className="value">{pokemon.height}</span>
            </label>
            <label htmlFor="weight">
              <input
                type="radio"
                name="option"
                id="weight"
                value={pokemon.weight}
                onClick={handleChecked}
                disabled={checkDisabled}
                className="selected"
              />
              <span className="option">Peso:</span>{" "}
              <span className="value">{pokemon.weight}</span>
            </label>
            {player === "Jogador" && (
              <Button
                title="Batalhar"
                disabled={btnDisabled}
                hadleBtn={battle}
              />
            )}
          </form>
        </div>
      ) : (
        <Loading customClass="card" />
      )}
    </>
  );
}
