import React from "react";
import "./modal.css";
import closeModalImg from "../../img/modal close.svg";

function Modal({ active, setActive, picture, setPicture }) {
  function closeModal() {
    setActive(false);
    setPicture("");
  }

  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content">
        {<img src={picture} alt="modalImg"></img>}
      </div>
      <img
        className="modal__close-img"
        src={closeModalImg}
        onClick={() => closeModal()}
        alt="closeModalImg"
      ></img>
    </div>
  );
}

export default Modal;
