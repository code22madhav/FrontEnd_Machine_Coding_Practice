const Card = ({ name, ref }) => {
  return (
    <div
      ref={ref}
      style={{
        width: "250px",
        height: "250px",
        border: "1px solid black",
        margin: "5px",
      }}
    >
      <p>{name}</p>
    </div>
  );
};

export default Card;
