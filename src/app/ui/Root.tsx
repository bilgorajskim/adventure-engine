import { observer, useObservable } from "mobx-react-lite";
import * as React from "react";
import { GameState, GameView, StateContext } from "app/state";
import { MenuView } from "./views/menu.view";
import { CharacterCreationView } from "./views/characterCreation.view";
import { CharacterStatsView } from "./views/characterStats.view";
import { StorySelectorView } from "./views/storySelector.view";
import { StoryView } from "./views/story.view";
import styled, { createGlobalStyle } from "styled-components";
import { Title } from "./title";
import config from "app/config";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Cinzel+Decorative&display=swap');
@import url('https://fonts.googleapis.com/css?family=Arima+Madurai&display=swap');
html, body {
  margin: 0;
  padding: 0;
}
  body {
    color: ${props => (props.whiteColor ? "white" : "black")};
    background: #444;
    font-family: "Arima Madurai", cursive;
  }
`;

const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
`;

export const Root = observer(() => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  let ViewComponent = null;
  switch (state.view) {
    case GameView.Menu:
      ViewComponent = MenuView;
      break;
    case GameView.CharacterCreation:
      ViewComponent = CharacterCreationView;
      break;
    case GameView.CharacterStats:
      ViewComponent = CharacterStatsView;
      break;
    case GameView.StorySelector:
      ViewComponent = StorySelectorView;
      break;
    case GameView.Story:
      ViewComponent = StoryView;
      break;
  }
  return (
    <>
      <GlobalStyle whiteColor />
      {ViewComponent === MenuView ? (
        <>
          <ViewComponent />
        </>
      ) : (
        <>
          <Title>{config.title}</Title>
          <Container>
            <ViewComponent />
          </Container>
        </>
      )}
    </>
  );
});
