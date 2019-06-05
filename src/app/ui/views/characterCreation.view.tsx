import * as React from "react";
import { GameState, GameView, StateContext } from "app/state";
import { useObservable } from "mobx-react-lite";
import { Button } from "../button";

export const CharacterCreationView = () => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  return (
    <>
      character creation..
      <br />
      nothing there yet..
      <br />
      <Button onClick={() => (state.view = GameView.Menu)}>Go back</Button>{" "}
      <Button onClick={() => (state.view = GameView.CharacterStats)}>
        Done
      </Button>
    </>
  );
};
