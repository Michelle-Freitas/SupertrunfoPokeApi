import pokebola from "../../assets/pokebola.svg";
import "./styles.css";

export function Card({ player }) {
  return (
    <div className="card">
      <h2 className="player">{player}</h2>
      <img src={pokebola} alt="Pokebola" />
    </div>
  );
}
