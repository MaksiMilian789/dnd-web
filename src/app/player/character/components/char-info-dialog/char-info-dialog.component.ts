import { Component, Inject } from '@angular/core';
import { GENDER_LOCALIZATION, Gender, IDEOLOGY_LOCALIZATION, Ideology } from '@core/enums';
import { Character } from '@core/models';
import { Characteristics } from '@core/models/character/characteristics.model';
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

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<Characteristics | null, CharInfoDialogData>,
  ) {
    this.character = context.data.character;
  }

  close(): void {
    this.context.completeWith(null);
  }

  get localizeGender(): string {
    return GENDER_LOCALIZATION[this.character.gender];
  }

  get localizeIdeology(): string {
    return IDEOLOGY_LOCALIZATION[this.character.ideology];
  }
}
