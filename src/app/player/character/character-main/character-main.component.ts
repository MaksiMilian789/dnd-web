import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  startWith,
} from 'rxjs';
import { HttpService } from 'src/app/shared';
import { Character } from 'src/app/shared/models/character.model';
import { CharacterInfoDialogComponent } from '../character-info-dialog/character-info-dialog.component';

@Component({
  selector: 'app-character-main',
  templateUrl: './character-main.component.html',
  styleUrls: ['./character-main.component.scss'],
})
export class CharacterMainComponent {
  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character$: Observable<Character> = this._http.loadCharacter(this.charId);
  statsForm: FormGroup;
  hpForm: FormGroup;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) {
    this.hpForm = new FormGroup({
      hp: new FormControl(0, [Validators.required, Validators.min(0)]),
      addHp: new FormControl(0, [Validators.required, Validators.min(0)]),
      maxHp: new FormControl({ value: 0, disabled: true }),
    });

    this.statsForm = new FormGroup({
      strength: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      dexterity: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      constitution: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      intelligence: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      wisdom: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
      charisma: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(30),
      ]),
    });

    this.refreshHits();
  }

  refreshHits(): void {
    this.hpForm
      .get('hp')
      ?.valueChanges.pipe(
        startWith(undefined),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.hpForm.get('maxHp')?.enable();
        if (this.hpForm.value.hp > this.hpForm.value.maxHp) {
          this.hpForm.patchValue({ hp: this.hpForm.value.maxHp });
        } else {
          this._http
            .editCharacterHp(
              this.charId,
              this.hpForm.value.hp,
              this.hpForm.value.addHp
            )
            .subscribe();
        }
        this.hpForm.get('maxHp')?.disable();
      });

      this.hpForm
      .get('addHp')
      ?.valueChanges.pipe(
        startWith(undefined),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.hpForm.get('maxHp')?.enable();
        if (this.hpForm.value.hp > this.hpForm.value.maxHp) {
          this.hpForm.patchValue({ hp: this.hpForm.value.maxHp });
        } else {
          this._http
            .editCharacterHp(
              this.charId,
              this.hpForm.value.hp,
              this.hpForm.value.addHp
            )
            .subscribe();
        }
        this.hpForm.get('maxHp')?.disable();
      });
  }

  reload(): void {
    this.character$ = this._http.loadCharacter(this.charId);
  }

  editStats(): void {
    this._http
      .editCharacterStats(
        this.charId,
        this.statsForm.value.strength,
        this.statsForm.value.dexterity,
        this.statsForm.value.constitution,
        this.statsForm.value.intelligence,
        this.statsForm.value.wisdom,
        this.statsForm.value.charisma
      )
      .subscribe({
        complete: () => {
          this._snackbar.open('Изменение успешно.');
          this.reload();
        },
      });
  }

  info(character: Character): void {
    this._dialog
      .open(CharacterInfoDialogComponent, {
        data: {
          character: character,
        },
        width: '70%',
      })
      .afterClosed()
      .subscribe(() => this.reload());
  }
}
