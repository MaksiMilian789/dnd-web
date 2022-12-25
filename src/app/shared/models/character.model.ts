export interface ShortCharacter {
  id?: number;
  name: string;
  className: string;
  level: number;
}

export interface Character extends ShortCharacter {
  age: number;
  genderName: string;
  raceName: string;
  backgroundName: string;
  ideologyName: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hp: number;
  addHp: number;
  maxHp: number;
  classArmor: number;
  proficiencyBonus: number;
}

export interface CharacterWithId {
  name: string;
  level: number;
  age: number;
  classId: number;
  genderId: number;
  raceId: number;
  backgroundId: number;
  ideologyId: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hp: number;
  addHp: number;
  maxHp: number;
  classArmor: number;
  proficiencyBonus: number;
}