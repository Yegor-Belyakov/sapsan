import React from "react";
import searchImg from "../../img/input find img.svg";
import deleteImg from "../../img/input delete img.svg";
import "../input/input.css";

function Input({
  inputValue,
  setInputValue,
  setImages,
  setNotFound,
}) {
  function clearInput() {
    setInputValue("");
    setImages([]);
    setNotFound(false);
  }

  return (
    <div
      className="input__wrapper"
      onClick={() => document.getElementById("input").focus()}
    >
      <div className="input__left-block">
        <img
          src={searchImg}
          className="input__img-search"
          alt="searchImg"
        ></img>
        <input
          autoComplete="off"
          className="input"
          placeholder="Телефоны, яблоки, груши..."
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="input"
        ></input>
      </div>

      {inputValue  && (
        <img
          onClick={() => clearInput()}
          src={deleteImg}
          className="input__img-delete"
          alt="deleteImg"
        ></img>
      )}
    </div>
  );
}

export default Input;
