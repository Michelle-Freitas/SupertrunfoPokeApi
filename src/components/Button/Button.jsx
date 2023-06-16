import "./styles.css";

export function Button({ title, hadleBtn, disabled }) {
  const sortition = (e) => {
    e.preventDefault();
    hadleBtn();
  };

  return (
    <div>
      <button className="btn" onClick={sortition} disabled={disabled}>
        {title}
      </button>
    </div>
  );
}
