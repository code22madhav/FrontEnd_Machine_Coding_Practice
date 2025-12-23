const Card = ({ name, ref }) => {
  return (
    <div
      ref={ref}
      style={{
        width: "50px",
        height: "50px",
        border: "1px solid black",
        margin: "5px",
      }}
    >
      <p>{name}</p>
    </div>
  );
};

export default Card;
