// import "./App.css";
import './style/sass/main.scss';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routers/Routing";
import { createBrowserHistory } from "history";

const defaultHistory = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter history={defaultHistory}>
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
