import React from "react";
import "./button.css";

function Button({ findPhoto }) {
  return (
    <div>
      <button type="submit" onClick={(e) => findPhoto(e)} className="btn">
        Искать
      </button>
    </div>
  );
}

export default Button;
