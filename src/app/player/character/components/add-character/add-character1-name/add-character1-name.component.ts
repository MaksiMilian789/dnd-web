import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AddCharacterCacheService } from '../add-character-cache.service';
import { GENDER_LOCALIZATION } from '@core/enums';

@Component({
  selector: 'app-add-character1-name',
  templateUrl: './add-character1-name.component.html',
  styleUrls: ['./add-character1-name.component.scss'],
})
export class AddCharacter1NameComponent {
  addForm: FormGroup;

  genders = GENDER_LOCALIZATION;

  constructor(
    private _cacheService: AddCharacterCacheService
  ) {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });

    if (this._cacheService.character.name != '') {
      this.addForm.patchValue({
        name: this._cacheService.character.name,
        gender: this._cacheService.character.gender,
      });
    }
  }

  save(): void {
    this._cacheService.firstStage(
      this.addForm.value.name,
      this.addForm.value.gender
    );
  }
}
