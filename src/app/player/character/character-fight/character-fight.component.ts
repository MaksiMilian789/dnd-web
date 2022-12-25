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
import { Condition } from 'src/app/shared/models/condition.model';
import { CharacterInfoDialogComponent } from '../character-info-dialog/character-info-dialog.component';
import { AddConditionDialogComponent } from './add-condition-dialog/add-condition-dialog.component';

@Component({
  selector: 'app-character-fight',
  templateUrl: './character-fight.component.html',
  styleUrls: ['./character-fight.component.scss'],
})
export class CharacterFightComponent {
  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character$: Observable<Character> = this._http.loadCharacter(this.charId);
  hpForm: FormGroup;

  condition$: Observable<Condition[]> = this._http.getCharacterConditions(
    this.charId
  );

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

  reloadCond(): void {
    this.condition$ = this._http.getCharacterConditions(this.charId);
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

  addCond(): void {
    this._dialog
      .open(AddConditionDialogComponent, {
        data: { charId: this.charId },
        width: '300px',
      })
      .afterClosed()
      .subscribe(() => this.reloadCond());
  }

  deleteCond(condId: number): void {
    this._http
    .deleteCharacterCondition(
      this.charId,
      condId
    )
    .subscribe({
      complete: () => {
        this._snackbar.open('Удаление успешно.');
        this.reloadCond();
      },
    });}
}
