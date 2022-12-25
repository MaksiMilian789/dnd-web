import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/shared';
import { CharacterWithId } from 'src/app/shared/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class AddCharacterCacheService {
  public character!: CharacterWithId;

  constructor(private _http: HttpService, private _snackbar: MatSnackBar) {
    this.reload();
  }

  reload(): void{
    this.character = {
      name: '',
      level: 0,
      age: 0,
      classId: 0,
      genderId: 0,
      raceId: 0,
      backgroundId: 0,
      ideologyId: 0,
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

  firstStage(name: string, genderId: number) {
    this.character.name = name;
    this.character.genderId = genderId;
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
    this.character.strength = strength;
    this.character.dexterity = dexterity;
    this.character.constitution = constitution;
    this.character.intelligence = intelligence;
    this.character.wisdom = wisdom;
    this.character.charisma = charisma;
  }

  fourthStage(backgroundId: number, ideologyId: number) {
    this.character.backgroundId = backgroundId;
    this.character.ideologyId = ideologyId;
  }

  save(): void {
    this._http
      .createCharacter(this.character, sessionStorage.getItem('auth') as string)
      .subscribe({
        complete: () => {
          this._snackbar.open('Создание успешно.');
        },
      });
  }
}
