import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AddCharacterCacheService } from '../add-character-cache.service';
import { CharacterService } from '@core/services/api/character.service';
import { Ideology, IDEOLOGY_LOCALIZATION } from '@core/enums';
import { Background } from '@core/models';

@Component({
  selector: 'app-add-character4-background',
  templateUrl: './add-character4-background.component.html',
  styleUrls: ['./add-character4-background.component.scss'],
})
export class AddCharacter4BackgroundComponent {
  addForm: FormGroup;

  backgrounds$: Observable<Background[]>;

  ideologies = IDEOLOGY_LOCALIZATION;

  descriptionBackground: string = 'Описание выбранной предыстории';
  descriptionIdeology: string = 'Описание выбранного мировозрения';

  constructor(
    private _cacheService: AddCharacterCacheService,
    private _characterService: CharacterService,
    private _router: Router
  ) {
    this.addForm = new FormGroup({
      background: new FormControl('', Validators.required),
      ideology: new FormControl('', Validators.required),
    });

    this.backgrounds$ = this._characterService.getBackgrounds();

    if(this._cacheService.character.name == '') this._router.navigate(['/player/createCharacterName']);
  }

  save(): void {
    this._cacheService.fourthStage(
      this.addForm.value.background,
      this.addForm.value.ideology,
    );

    this._cacheService.save();
  }

  changeDescriptionBackground(description: string): void {
    this.descriptionBackground = "Предыстория: " + description;
  }

  changeDescriptionIdeology(description: string): void {
    this.descriptionIdeology = "Мировозрение: " + description;
  }
}
