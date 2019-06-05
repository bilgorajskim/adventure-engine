import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "app";
import { gameState, StateContext } from "app/state";

// render react DOM
ReactDOM.render(
  <StateContext.Provider value={gameState}>
    <App />
  </StateContext.Provider>,
  document.getElementById("root")
);
