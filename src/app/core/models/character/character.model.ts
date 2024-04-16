import { Gender, Ideology, System } from "@core/enums";
import { Characteristics } from "./characteristics.model";
import { Race } from "./races/race.model";
import { Background } from "./backgrounds/background.model";
import { Class } from "./classes/class.model";

export interface ShortCharacter {
  id?: number;
  name: string;
  className?: string;
  level: number;
  system: System;
}

export interface Character extends ShortCharacter {
  age: number;
  gender: Gender;
  ideology: Ideology;
  characteristics: Characteristics;
  raceInstance: Race;
  backgroundInstance: Background;
  classInstance: Class;
}

export interface CharacterWithId extends ShortCharacter {
  age: number;
  gender: Gender;
  ideology: Ideology;
  characteristics: Characteristics;
  classId: number;
  raceId: number;
  backgroundId: number;
}