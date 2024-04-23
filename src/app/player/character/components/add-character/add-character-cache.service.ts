import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Gender, Ideology, System } from '@core/enums';

import { CharacterWithId } from '@core/models/character/character.model';
import { Characteristics } from '@core/models/character/characteristics.model';
import { CharacterService } from '@core/services/api/character.service';
import { AuthService } from '@core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddCharacterCacheService {
  public character!: CharacterWithId;

  constructor(
    private _characterService: CharacterService,
    private _auth: AuthService,
    private _snackbar: MatSnackBar
  ) {
    this.reload();
  }

  reload(): void {
    let characteristics: Characteristics = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };

    this.character = {
      name: '',
      level: 0,
      age: 0,
      classId: 0,
      gender: 0,
      raceId: 0,
      backgroundId: 0,
      ideology: 0,
      characteristics: characteristics,
      system: System.Dnd,
    };
  }

  firstStage(name: string, gender: Gender) {
    this.character.name = name;
    this.character.gender = gender;
  }

  secondStage(classId: number) {
    this.character.classId = classId;
  }

  thirdStage(
    raceId: number,
    age: number,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  ) {
    this.character.raceId = raceId;
    this.character.age = age;
    this.character.characteristics.strength = strength;
    this.character.characteristics.dexterity = dexterity;
    this.character.characteristics.constitution = constitution;
    this.character.characteristics.intelligence = intelligence;
    this.character.characteristics.wisdom = wisdom;
    this.character.characteristics.charisma = charisma;
  }

  fourthStage(backgroundId: number, ideology: Ideology) {
    this.character.backgroundId = backgroundId;
    this.character.ideology = ideology;
  }

  save(): void {
    this._characterService
      .createCharacter(this.character, this._auth.currentUser?.id ?? 0)
      .subscribe({
        complete: () => {
          this._snackbar.open('Создание успешно.');
        },
      });
  }
}
