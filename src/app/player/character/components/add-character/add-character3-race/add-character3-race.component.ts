import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AddCharacterCacheService } from '../add-character-cache.service';
import { CharacterService } from '@core/services/api/character.service';
import { Race } from '@core/models';

@Component({
  selector: 'app-add-character3-race',
  templateUrl: './add-character3-race.component.html',
  styleUrls: ['./add-character3-race.component.scss'],
})
export class AddCharacter3RaceComponent {
  addForm: FormGroup;
  statsForm: FormGroup;

  races$: Observable<Race[]>;

  description: string = 'Описание выбранной расы';

  maxAge: number = -1;

  constructor(
    private _cacheService: AddCharacterCacheService,
    private _characterService: CharacterService,
    private _router: Router
  ) {
    this.addForm = new FormGroup({
      race: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });

    this.statsForm = new FormGroup({
      strength: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      dexterity: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      constitution: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      intelligence: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      wisdom: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      charisma: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
    });

    this.races$ = this._characterService.getRaces();

    if(this._cacheService.character.name == '') this._router.navigate(['/player/createCharacterName']);

    if (this._cacheService.character.raceId != 0) {
      this.races$.subscribe((val) => {
        let race = val.find(
          (x) => x.id === this._cacheService.character.raceId
        );
        this.addForm.setValue({
          race: race?.id,
          age: this._cacheService.character.age,
        });
        this.changeMaxAge(race?.name as string);
        this.description = race?.description as string;
        this.statsForm.setValue({
          strength: this._cacheService.character.characteristics.strength,
          dexterity: this._cacheService.character.characteristics.dexterity,
          constitution: this._cacheService.character.characteristics.constitution,
          intelligence: this._cacheService.character.characteristics.intelligence,
          wisdom: this._cacheService.character.characteristics.wisdom,
          charisma: this._cacheService.character.characteristics.charisma,
        });
      });
    }
  }

  save(): void {
    this._cacheService.thirdStage(
      this.addForm.value.race,
      this.addForm.value.age,
      this.statsForm.value.strength,
      this.statsForm.value.dexterity,
      this.statsForm.value.constitution,
      this.statsForm.value.intelligence,
      this.statsForm.value.wisdom,
      this.statsForm.value.charisma
    );
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  changeMaxAge(race: string): void {
    switch (race) {
      case 'Аасимар':
        this.maxAge = 1000;
        break;
      case 'Гном':
        this.maxAge = 200;
        break;
      case 'Тифлинг':
        this.maxAge = 100;
        break;
      case 'Фирболг':
        this.maxAge = 250;
        break;
      case 'Дварф':
        this.maxAge = 250;
        break;
      case 'Драконорожденный':
        this.maxAge = 100;
        break;
      case 'Полуорк':
        this.maxAge = 100;
        break;
      case 'Полуэльф':
        this.maxAge = 220;
        break;
      case 'Эльф':
        this.maxAge = 500;
        break;
      case 'Человек':
        this.maxAge = 130;
        break;
    }
  }
}
