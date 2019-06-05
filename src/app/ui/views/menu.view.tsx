import * as React from "react";
import { useObservable } from "mobx-react-lite";
import { GameState, GameView, StateContext } from "app/state";
import { Button } from "../button";
import { Title } from "../title";
import styled from "styled-components";
import config from "app/config";

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

const Copyright = styled.div`
  text-align: center;
  font-size: 1.25rem;
  display: block;
  width: 100%;
  margin-top: 3rem;
  color: #ddd;
  text-shadow: 0 2px 1px black, 0 0 6px rgba(0, 0, 0, 0.5);
`;

export const MenuView = () => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  return (
    <>
      <VContainer>
        <Menu>
          <Title>
            {config.title}
            <small>{config.catchline}</small>
          </Title>
          <p>
            <Button
              highlighted
              onClick={() => (state.view = GameView.CharacterCreation)}
            >
              Begin your adventure
            </Button>
          </p>
          <Copyright>{config.copyright}</Copyright>
        </Menu>
      </VContainer>
    </>
  );
};
