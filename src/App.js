import { useState } from "react";
import "./App.css";
import loadingImg from ".//img/loading img.svg";
import Button from "./components/button/button";
import Input from "./components/input/input";
import Modal from "./components/modal/modal";
import Photo from "./components/photo/photo";

function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [picture, setPicture] = useState("");
  const [valueDirty, setValueDirty] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function findPhoto() {
    setIsLoading(true);
    await fetch(
      `https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${inputValue}&page=1&per_page=30`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => setImages(data.results));

    setIsLoading(false);
    images.length === 0 && setValueDirty(true);

    if (valueDirty && images.length === 0) {
      setNotFound(true);
    }
  }

  return (
    <div className={!valueDirty ? "App" : ""}>
      <div className="App__wrapper">
        <div
          className={
            !valueDirty ? "App__search-group-dirty" : "App__search-group"
          }
        >
          <Input
            inputValue={inputValue}
            setInputValue={setInputValue}
            setImages={setImages}
            valueDirty={valueDirty}
            setNotFound={setNotFound}
          />
          <Button findPhoto={findPhoto} />
        </div>
        {isLoading ? (
          <img className="loader" src={loadingImg} alt="loadingImg"></img>
        ) : images.length ? (
          <Photo
            images={images}
            setModalActive={setModalActive}
            setPicture={setPicture}
          />
        ) : (
          notFound && (
            <p className="not-found">К сожалению, поиск не дал результатов</p>
          )
        )}
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        picture={picture}
        setPicture={setPicture}
      />
    </div>
  );
}

export default App;
