import React, { useState } from "react";
import "./index.css";
import Display from "./display";

const MainInput = () => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput("");
    const value = e.target.value;
    setInput(value);
  };

  return (
    <div className="input-container">
      <div class="navbar">
        <div class="navbar-search">
          <div>
            <input
              type="text"
              class="input-box"
              placeholder="Enter your location"
              onChange={handleChange}
            />
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          </div>
          {input ? <Display input={input} /> : null}
        </div>
      </div>
    </div>
  );
};

export default MainInput;