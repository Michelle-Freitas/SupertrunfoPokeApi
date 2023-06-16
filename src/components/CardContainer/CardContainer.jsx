import { useState } from "react";
import { Card } from "../Card/Card";
import { PokeCard } from "../PokeCard/PokeCard";
import "./styles.css";

export function CardContainer({ status, pokemonPlayer, pokemonMachine }) {
  const [battle, setBattle] = useState("");

  function toggleBattle() {
    setBattle("battle");
  }

  return (
    <div className="card-container">
      {status === "begining" && (
        <>
          <Card player="Jogador" />
          <Card player="Máquina" />
        </>
      )}
      {status === "sorted" && (
        <>
          <PokeCard
            player="Jogador"
            pokemon={pokemonPlayer}
            toggleBattle={toggleBattle}
          />
          {battle === "battle" ? (
            <PokeCard
              player="Máquina"
              pokemon={pokemonMachine}
              toggleBattle={toggleBattle}
            />
          ) : (
            <Card player="Máquina" />
          )}
        </>
      )}
    </div>
  );
}
