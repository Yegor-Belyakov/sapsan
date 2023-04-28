import { useEffect, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalImageCount, setTotalImageCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      setIsLoading(true)
      setCurrentPage((prevState) => prevState + 1);
      console.log("fetching");
      fetch(
        `https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${inputValue}&page=${currentPage}&per_page=30`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setImages([...images, ...data.results]);

          setTotalImageCount(data.total);
        })
        .finally(() => setFetching(false));
    }
    setIsLoading(false)
    
    console.log("data.total всего картинок ===", totalImageCount);
    console.log("current page текущая страница ===", currentPage);
    console.log("images.length=== длинна массива фоток", images.length);
  }, [fetching]);

  function findPhoto(e) {
    e.preventDefault();
    setCurrentPage(1);
    setFetching(true);
    images.length === 0 && setValueDirty(true);
    if (images.length === 0) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
      //    &&
      // images.length < totalImageCount
    ) {
      console.log("ты внизу страницы");
      setFetching(true);
    }
  };

  useEffect(() => {
    if (inputValue === "" && valueDirty) {
      setInputValue("");
      setImages([]);
      setNotFound(false);
    }
  }, [inputValue]);

  return (
    <div className={!valueDirty ? "App" : ""}>
      <div className="App__wrapper">
        <form>
          <div
            className={
              !valueDirty ? "App__search-group-dirty" : "App__search-group"
            }
          >
            <Input
              inputValue={inputValue}
              setInputValue={setInputValue}
              setImages={setImages}
              setNotFound={setNotFound}
            />
            <Button findPhoto={findPhoto} />
          </div>
        </form>
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
