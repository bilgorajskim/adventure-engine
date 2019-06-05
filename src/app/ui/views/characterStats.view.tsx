import * as React from "react";
import { useObservable, observer } from "mobx-react-lite";
import { GameState, GameView, CharacterSkill, StateContext } from "app/state";
import { Button } from "../button";
import styled from "styled-components";

const PointsRemaining = styled.span`
  & > b {
    color: #0bb1c1;
  }
`;
const NoSkillPoints = styled.span`
  color: red;
`;
const BottomSection = styled.span`
  display: flex;
  margin-top: 15px;
`;
const BottomLeftSection = styled.span`
  width: 50%;
`;
const BottomRightSection = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;
const SkillRowDiv = styled.div`
  line-height: 40px;
  width: 50%;
  display: flex;
  align-items: center;
  & > span:nth-of-type(1) {
    width: 140px;
    display: block;
    margin-left: 20px;
  }
  & > span:nth-of-type(2) {
    width: 60px;
    display: block;
  }
  & > button {
    float: right;
    margin-right: 20px;
  }
`;
const CharacterStats = styled.div`
  display: flex;
`;
const Abilities = styled.div`
  width: 50%;
`;
const Skills = styled.div`
  width: 50%;
  background: #333;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  max-height: 400px;
`;
const Info = styled.p`
  padding: 10px 15px;
  color: #f5f5f5;
  background: #0d5d65;
  border: solid 2px #084248;
  border-radius: 2px;
`;
const SubTitle = styled.h2`
  font-family: "Cinzel Decorative", cursive;
  color: #0bb1c1;
  font-size: 2rem;
  text-align: center;
  text-shadow: 0 3px 1px black, 0 0 12px rgba(0, 0, 0, 0.5);
`;

const SkillRow = observer(
  ({
    onUpgrade,
    skill,
    skills,
    skillPoints
  }: {
    onUpgrade: any;
    skill: CharacterSkill;
    skills: any;
    skillPoints: number;
  }) => {
    return (
      <SkillRowDiv>
        <span>{skill}</span> <span>{skills[skill]}/15</span>
        {skillPoints > 0 && skills[skill] < 15 ? (
          <Button onClick={onUpgrade}>+</Button>
        ) : null}
      </SkillRowDiv>
    );
  }
);

const SkillRows = observer(
  ({
    onUpgrade,
    skillPoints,
    skills
  }: {
    onUpgrade: any;
    skillPoints: number;
    skills: any;
  }) => {
    return (
      <>
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Strength)}
          skill={CharacterSkill.Strength}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Speed)}
          skill={CharacterSkill.Speed}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Agility)}
          skill={CharacterSkill.Agility}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Stamina)}
          skill={CharacterSkill.Stamina}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Endurance)}
          skill={CharacterSkill.Endurance}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Courage)}
          skill={CharacterSkill.Courage}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Perception)}
          skill={CharacterSkill.Perception}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Nature)}
          skill={CharacterSkill.Nature}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Persuasion)}
          skill={CharacterSkill.Persuasion}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Craftsmanship)}
          skill={CharacterSkill.Craftsmanship}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Survival)}
          skill={CharacterSkill.Survival}
          skills={skills}
        />
        <SkillRow
          skillPoints={skillPoints}
          onUpgrade={onUpgrade.bind(this, CharacterSkill.Medicine)}
          skill={CharacterSkill.Medicine}
          skills={skills}
        />
      </>
    );
  }
);

export const CharacterStatsView = observer(() => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  return (
    <>
      <SubTitle>Build your skills</SubTitle>
      <Info>
        In order for your character to perform well on their journey you must
        train them in a variety of skills. <br />
        How you go about distributing your characters skill points is entirely
        up to you but choose carefully as this can not be undone. <br />
        For every 5 points placed on a skill you will receive a special ability
        that may assist you in your travels.
      </Info>
      <CharacterStats>
        <Abilities />
        <Skills>
          <SkillRows
            skills={state.character.skills}
            skillPoints={state.character.skillPoints}
            onUpgrade={skill => {
              state.character.upgradeSkill(skill);
            }}
          />
        </Skills>
      </CharacterStats>
      <BottomSection>
        <BottomLeftSection />
        <BottomRightSection>
          <Button onClick={() => (state.view = GameView.CharacterCreation)}>
            Go back
          </Button>
          {state.character.skillPoints > 0 ? (
            <PointsRemaining>
              Skill points remaining: <b>{state.character.skillPoints}</b>
            </PointsRemaining>
          ) : (
            <NoSkillPoints>No more skill points!</NoSkillPoints>
          )}
          <Button
            disabled={state.character.skillPoints > 0}
            onClick={() => (state.view = GameView.StorySelector)}
          >
            Done
          </Button>
        </BottomRightSection>
      </BottomSection>
    </>
  );
});
