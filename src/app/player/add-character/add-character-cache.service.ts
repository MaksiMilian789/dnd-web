import { Injectable } from '@angular/core';
import { Character } from 'src/app/shared/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class AddCharacterCacheService {
  character: Character;

  constructor() {
    this.character = {
      name: '',
      className: '',
      level: 0,
      age: 0,
      gender: '',
      race: '',
      background: '',
      ideology: '',
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      hp: 0,
      addHp: 0,
      maxHp: 0,
      classArmor: 0,
      proficiencyBonus: 0,
    };
  }

  firstStage() {}
}
