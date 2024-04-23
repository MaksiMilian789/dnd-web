import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { forkJoin, merge } from 'rxjs';

import { Character } from '@core/models/character/character.model';
import { CharacterService } from '@core/services/api/character.service';

@Component({
  selector: 'app-character-info-dialog',
  templateUrl: './character-info-dialog.component.html',
  styleUrls: ['./character-info-dialog.component.scss'],
})
export class CharacterInfoDialogComponent {
  infoForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<CharacterInfoDialogComponent>,
    private _characterService: CharacterService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { character: Character }
  ) {
    this.infoForm = new FormGroup({
      name: new FormControl(this.data.character.name, Validators.required),
      class: new FormControl(this.data.character.className),
      race: new FormControl(this.data.character.raceInstance.name),
      ideology: new FormControl(this.data.character.ideology),
      background: new FormControl(this.data.character.backgroundInstance.name),
      level: new FormControl(this.data.character.level, Validators.required),
      age: new FormControl(this.data.character.age, Validators.required),
    });
  }

  save(): void {
    /*let proficiencyBonus = this.calcProficiencyBonus();
    let maxHp = this.calcMaxHp();
    forkJoin([
      this._characterService.editCharacterInfo(
        this.data.character.id as number,
        this.infoForm.value.name,
        this.infoForm.value.age
      ),
      this._characterService.editCharacterLevel(
        this.data.character.id as number,
        this.infoForm.value.level,
        maxHp,
        proficiencyBonus
      ),
    ]).subscribe({
      complete: () => {
        this._snackbar.open('Изменение успешно.');
      },
    });*/
  }

  calcProficiencyBonus(): number {
    switch (this.infoForm.value.level) {
      case 1:
      case 2:
      case 3:
      case 4:
        return 2;
      case 5:
      case 6:
      case 7:
      case 8:
        return 3;
      case 9:
      case 10:
      case 11:
      case 12:
        return 4;
      case 13:
      case 14:
      case 15:
      case 16:
        return 5;
      case 17:
      case 18:
      case 19:
      case 20:
        return 6;
      default:
        return 0;
    }
  }

  calcMaxHp(): number {
    return 5 + this.infoForm.value.level * 5;
  }

  close(): void {
    this._dialogRef.close();
  }
}