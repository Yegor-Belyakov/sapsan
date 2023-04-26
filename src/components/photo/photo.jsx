import React from "react";

import "./photo.css";

function Photo({ images, setModalActive, setPicture }) {
  function openModal(url) {
    setModalActive(true);
    setPicture(url);
  }
  return (
    <div className="photo__wrapper">
      {images.map((el) => (
        <img
          onClick={() => openModal(el.urls.regular)}
          key={el.id}
          src={el.urls.small}
          alt="bigImage"
          className="photo__img"
        ></img>
      ))}
    </div>
  );
}

export default Photo;
