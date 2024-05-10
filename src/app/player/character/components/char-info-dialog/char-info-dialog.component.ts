import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GENDER_LOCALIZATION, Gender, IDEOLOGY_LOCALIZATION, Ideology } from '@core/enums';
import { Character } from '@core/models';
import { Characteristics } from '@core/models/character/characteristics.model';
import { CharacterService } from '@core/services/api/character.service';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface CharInfoDialogData {
  character: Character;
}

@Component({
  selector: 'app-char-info-dialog',
  templateUrl: './char-info-dialog.component.html',
  styleUrl: './char-info-dialog.component.scss',
})
export class CharInfoDialogComponent {
  protected character: Character;

  edit: boolean = false;

  name = new FormControl('', { nonNullable: true, validators: Validators.required });
  level = new FormControl(0, { nonNullable: true, validators: Validators.required });
  age = new FormControl(0, { nonNullable: true, validators: Validators.required });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean, CharInfoDialogData>,
    private _characterService: CharacterService,
  ) {
    this.character = context.data.character;
    this.name.setValue(this.character.name);
    this.level.setValue(this.character.level);
    this.age.setValue(this.character.age);
  }

  close(): void {
    this.context.completeWith(false);
  }

  editable(): void {
    this.edit = true;
  }

  save(): void {
    this._characterService
      .editCharacterInfo(this.character.id!, this.name.value, this.level.value, this.age.value)
      .subscribe(() => {
        this.context.completeWith(true);
      });
  }

  get localizeGender(): string {
    return GENDER_LOCALIZATION[this.character.gender];
  }

  get localizeIdeology(): string {
    return IDEOLOGY_LOCALIZATION[this.character.ideology];
  }
}
