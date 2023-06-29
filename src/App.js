import { useState} from "react";
import {dateBuilder} from "./components/Date";
import Clock from "./components/Clock";
import useBackgroundChange from "./components/BgChange";

const api={
  key:"6644b3a309b45619eff765a5835e8e7a",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
