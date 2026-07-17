import { useState } from "react";
const Modal = () => {
  const [modalState, setModalState] = useState(false);
  function handleClick() {
    setModalState((prev) => !prev);
  }
  return (
    <>
      <button
        onClick={(e) => {
          handleClick();
          e.stopPropagation();
        }}
        disabled={modalState ? true : false}
        style={{
          background: "lightgrey",
          color: "black",
          width: "90px",
          height: "30px",
        }}
      >
        Show Modal
      </button>
      {modalState && (
        <div
          onClick={handleClick}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "350px",
              border: "1px solid black",
              height: "200px",
              margin: "0 auto",
              background: "white",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Modal Component</h3>
            <p>This is a Modal component made with react.js</p>
            <button
              style={{ margin: "auto auto 0 auto", width: "110px" }}
              onClick={handleClick}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
