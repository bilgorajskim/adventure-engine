import * as React from "react";
import { useObservable } from "mobx-react-lite";
import { GameState, GameView, StateContext } from "app/state";
import { Button } from "../button";
import { Title } from "../title";
import styled from "styled-components";

const VContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Menu = styled.div`
  text-align: center;
`;

export const MenuView = () => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  return (
    <>
      <VContainer>
        <Menu>
          <Title>Royal Adventures</Title>
          <p>
            <Button
              highlighted
              onClick={() => (state.view = GameView.CharacterCreation)}
            >
              Begin your adventure
            </Button>
          </p>
        </Menu>
      </VContainer>
    </>
  );
};
