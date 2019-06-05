import { observable } from "mobx";
import * as React from "react";

export enum GameView {
  Menu,
  CharacterCreation,
  CharacterStats,
  StorySelector,
  Story
}

export enum CharacterSkill {
  Strength = "Strength",
  Speed = "Speed",
  Agility = "Agility",
  Stamina = "Stamina",
  Endurance = "Endurance",
  Courage = "Courage",
  Perception = "Perception",
  Nature = "Nature",
  Persuasion = "Persuasion",
  Craftsmanship = "Craftsmanship",
  Survival = "Survival",
  Medicine = "Medicine"
}

export type GameState = {
  character: {
    skills: {
      [CharacterSkill.Strength]: number;
      [CharacterSkill.Speed]: number;
      [CharacterSkill.Agility]: number;
      [CharacterSkill.Stamina]: number;
      [CharacterSkill.Endurance]: number;
      [CharacterSkill.Courage]: number;
      [CharacterSkill.Perception]: number;
      [CharacterSkill.Nature]: number;
      [CharacterSkill.Persuasion]: number;
      [CharacterSkill.Craftsmanship]: number;
      [CharacterSkill.Survival]: number;
      [CharacterSkill.Medicine]: number;
    };
    skillPoints: number;
    upgradeSkill: (skill: CharacterSkill) => any;
  };
  view: GameView;
};

export const gameState = observable({
  character: {
    skills: {
      [CharacterSkill.Strength]: 0,
      [CharacterSkill.Speed]: 0,
      [CharacterSkill.Agility]: 0,
      [CharacterSkill.Stamina]: 0,
      [CharacterSkill.Endurance]: 0,
      [CharacterSkill.Courage]: 0,
      [CharacterSkill.Perception]: 0,
      [CharacterSkill.Nature]: 0,
      [CharacterSkill.Persuasion]: 0,
      [CharacterSkill.Craftsmanship]: 0,
      [CharacterSkill.Survival]: 0,
      [CharacterSkill.Medicine]: 0
    },
    skillPoints: 30,
    upgradeSkill: function(skill: CharacterSkill) {
      this.skills[skill] = this.skills[skill] + 1;
      this.skillPoints = this.skillPoints - 1;
    }
  },
  view: GameView.Menu
} as GameState);

export const StateContext = React.createContext<GameState>(gameState);
