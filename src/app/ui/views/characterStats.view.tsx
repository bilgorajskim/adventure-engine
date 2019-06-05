import * as React from "react";
import { useObservable, observer } from "mobx-react-lite";
import { GameState, GameView, CharacterSkill, StateContext } from "app/state";
import { Button } from "../button";
import styled from "styled-components";
import { toJS } from "mobx";

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
    width: 120px;
    display: block;
    margin-left: 5px;
  }
  & > span:nth-of-type(2) {
    width: 40px;
    display: block;
  }
  & > button {
    margin: 0 2px;
  }
  & > button:disabled {
    visibility: hidden;
  }
  & > button:last-of-type {
    margin-right: 5px;
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
    onDowngrade,
    skill,
    skills,
    baseSkills,
    skillPoints
  }: {
    onUpgrade: any;
    onDowngrade: any;
    skill: CharacterSkill;
    skills: any;
    baseSkills: any;
    skillPoints: number;
  }) => {
    return (
      <SkillRowDiv>
        <span>{skill}</span> <span>{skills[skill]}/15</span>
        <Button
          disabled={!(skills[skill] > 0 && skills[skill] > baseSkills[skill])}
          onClick={onDowngrade}
        >
          -
        </Button>
        <Button
          disabled={!(skillPoints > 0 && skills[skill] < 15)}
          onClick={onUpgrade}
        >
          +
        </Button>
      </SkillRowDiv>
    );
  }
);

const SkillRows = observer(
  ({
    onUpgrade,
    onDowngrade,
    skillPoints,
    skills,
    baseSkills
  }: {
    onUpgrade: any;
    onDowngrade: any;
    skillPoints: number;
    skills: any;
    baseSkills: any;
  }) => {
    const skillList = [
      CharacterSkill.Strength,
      CharacterSkill.Speed,
      CharacterSkill.Agility,
      CharacterSkill.Stamina,
      CharacterSkill.Endurance,
      CharacterSkill.Courage,
      CharacterSkill.Perception,
      CharacterSkill.Nature,
      CharacterSkill.Persuasion,
      CharacterSkill.Craftsmanship,
      CharacterSkill.Survival,
      CharacterSkill.Medicine
    ];
    return (
      <>
        {skillList.map(skill => (
          <SkillRow
            skillPoints={skillPoints}
            onUpgrade={onUpgrade.bind(this, skill)}
            onDowngrade={onDowngrade.bind(this, skill)}
            skill={skill}
            baseSkills={baseSkills}
            skills={skills}
          />
        ))}
      </>
    );
  }
);

export const CharacterStatsView = observer(() => {
  const gameState = React.useContext(StateContext);
  const state = useObservable<GameState>(gameState);
  const [baseSkills, setBaseSkills] = React.useState(null);
  const [, setBaseSkillPoints] = React.useState(null);
  React.useEffect(() => {
    setBaseSkills(toJS(state.character.skills));
    setBaseSkillPoints(state.character.skillPoints);
  }, []);
  if (!baseSkills) {
    return null;
  }
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
            baseSkills={baseSkills}
            skills={state.character.skills}
            skillPoints={state.character.skillPoints}
            onUpgrade={skill => {
              state.character.upgradeSkill(skill);
            }}
            onDowngrade={skill => {
              state.character.downgradeSkill(skill);
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
            Continue
          </Button>
        </BottomRightSection>
      </BottomSection>
    </>
  );
});
