import React from "react";
import "./button.css";

function Button({ findPhoto }) {
  return (
    <div>
      <button onClick={() => findPhoto()} className="btn">
        Искать
      </button>
    </div>
  );
}

export default Button;
