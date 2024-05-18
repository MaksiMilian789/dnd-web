import { Gender, Ideology, System } from "@core/enums";
import { Characteristics } from "./characteristics.model";
import { Race } from "./races/race.model";
import { Background } from "./backgrounds/background.model";
import { Class } from "./classes/class.model";
import { SpellSlot } from "./spells/spell-slot.model";
import { EnergySlot } from "./energy-slot.model";
import { Condition } from "./conditions/condition.model";
import { Inventory } from "./inventory/inventory.model";
import { Note } from "./note.model";
import { Skill } from "./skills/skill.model";
import { Spell } from "./spells/spell.model";

export interface ShortCharacter {
  id?: number;
  name: string;
  className?: string;
  level: number;
  system: System;
}

export interface Character extends ShortCharacter {
  age: number;
  hp: number;
  addHp: number;
  maxAttachments: number;
  imageId?: number;
  spellSlots: SpellSlot[];
  energySlots: EnergySlot[];
  gender: Gender;
  ideology: Ideology;
  characteristics: Characteristics;
  raceInstance: Race;
  backgroundInstance: Background;
  classInstance: Class;
  conditions: Condition[];
  skillInstance: Skill[];
  objectInstance: Inventory[];
  spellInstance: Spell[];
  note: Note[];  
}

export interface CharacterWithId extends ShortCharacter {
  age: number;
  gender: Gender;
  ideology: Ideology;
  characteristics: Characteristics;
  classId: number;
  raceId: number;
  backgroundId: number;
  skillIds: number[];
}