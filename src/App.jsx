import "./App.css";

import pokebola from "./assets/pokebola.svg";

import { Button } from "./components/Button/Button";
import { useEffect, useState } from "react";
import { CardContainer } from "./components/CardContainer/CardContainer";
import { Loading } from "./components/Loading/Loading";

function App() {
  const [removeLoading, setRemoveLoading] = useState(false);
  const [idPlayer, setIdPlayer] = useState();
  const [idMachine, setIdMachine] = useState();
  const [pokemons, setPokemons] = useState({});
  const [pokemonPlayer, setPokemonPlayer] = useState({});
  const [pokemonMachine, setPokemonMachine] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [status, setStatus] = useState("begining");

  useEffect(() => {
    setTimeout(() => {
      setRemoveLoading(true);
    }, 500);
  }, []);

  useEffect(() => {
    setIdMachine(parseInt(Math.floor(Math.random() * (151 - 1) + 1)));
    setIdPlayer(parseInt(Math.floor(Math.random() * (151 - 1) + 1)));

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`, {
      method: "GET",
      headers: {
        "Type-Content": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data);
        //console.log(pokemons.results[0].name)
      })
      .catch((err) => console.error(err));
  }, []);

  function hadleSortition() {
    let numberPlayer = parseInt(Math.floor(Math.random() * (151 - 1) + 1));
    let numberMachine = parseInt(Math.floor(Math.random() * (151 - 1) + 1));

    if (numberMachine === numberPlayer) {
      numberMachine = parseInt(Math.floor(Math.random() * (151 - 1) + 1));
    }
    setIdMachine(numberMachine);
    setIdPlayer(numberPlayer);
    // console.log(pokemons)
    // console.log('machine ' + idMachine)
    // console.log('player ' + idPlayer)
    setBtnDisabled(true);
    setStatus("sorted");

    handlePokemons();
  }

  function startOver() {
    setBtnDisabled(false);
    setStatus("begining");
    const refreshPage = () => {
      window.location.reload();
    };
    refreshPage();
    setRemoveLoading(false);
  }

  function handlePokemons() {
    let urlPlayer = pokemons.results[idPlayer].url;

    fetch(urlPlayer, {
      method: "GET",
      headers: {
        "Type-Content": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setPokemonPlayer(data);
      })
      .catch((err) => console.error(err));

    let urlMachine = pokemons.results[idMachine].url;

    fetch(urlMachine, {
      method: "GET",
      headers: {
        "Type-Content": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setPokemonMachine(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      {removeLoading ? (
        <div className="container">
          <h1>
            React Supertrunfo <img src={pokebola} alt="pokebola" />
            <span className="title">PokeApi</span>
          </h1>
          <CardContainer
            status={status}
            pokemonPlayer={pokemonPlayer}
            pokemonMachine={pokemonMachine}
          />
          <div className="buttons">
            <Button
              title="Sortear cartas"
              hadleBtn={hadleSortition}
              disabled={btnDisabled}
            />
            <Button
              title="Recomeçar"
              hadleBtn={startOver}
              disabled={!btnDisabled}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
