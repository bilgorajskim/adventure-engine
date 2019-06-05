import * as React from "react";
import { useObservable } from "mobx-react-lite";
import { GameState, GameView, StateContext } from "app/state";
import { Button } from "../button";

export const MenuView = () => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  return (
    <>
      <Button onClick={() => (state.view = GameView.CharacterCreation)}>
        Create character
      </Button>
    </>
  );
};
