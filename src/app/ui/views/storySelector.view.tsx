import * as React from "react";
import { GameState, GameView, StateContext } from "app/state";
import { useObservable } from "mobx-react-lite";
import { Button } from "../button";

export const StorySelectorView = () => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  return (
    <>
      story selector..
      <br />
      nothing there yet..
      <br />
      <Button onClick={() => (state.view = GameView.CharacterStats)}>
        Go back
      </Button>
      <br />
      <Button
        onClick={() => {
          state.character.skillPoints += 10;
          window.alert("10 skill points have been added");
        }}
      >
        gimme more skill points!
      </Button>
    </>
  );
};
