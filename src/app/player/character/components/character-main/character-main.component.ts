import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
} from 'rxjs';

import { Character } from '@core/models/character/character.model';
import { StatsSkillPipe } from 'src/app/shared/pipes/stats-skill.pipe';
import { CharacterInfoDialogComponent } from '../character-info-dialog/character-info-dialog.component';
import { AddConditionDialogComponent } from './add-condition-dialog/add-condition-dialog.component';
import { EditPriorityItemComponent } from './edit-priority-item/edit-priority-item.component';
import { CharacterService } from '@core/services/api/character.service';

@Component({
  selector: 'app-character-main',
  templateUrl: './character-main.component.html',
  styleUrls: ['./character-main.component.scss'],
  providers: [StatsSkillPipe],
})
export class CharacterMainComponent {
  @ViewChild("maxHp", {static: false}) maxHp!: ElementRef;

  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character$: Observable<Character> = this._characterService.loadCharacter(this.charId);
  statsForm: FormGroup;
  hpForm: FormGroup;

  firstItem: string = '';
  firstItemId: number = 0;
  secondItem: string = '';
  secondItemId: number = 0;

  /*condition$: Observable<Condition[]> = this._characterService.getCharacterConditions(
    this.charId
  );*/

  constructor(
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    public pipe: StatsSkillPipe
  ) {
    this.hpForm = new FormGroup({
      hp: new FormControl(0, [Validators.required, Validators.min(0)]),
      addHp: new FormControl(0, [Validators.required, Validators.min(0)]),
    });

    this.reloadItems();

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
        if (this.hpForm.value.hp > this.maxHp.nativeElement.value) {
          this.hpForm.patchValue({ hp: this.maxHp.nativeElement.value });
        } else {
          /*this._characterService
            .editCharacterHp(
              this.charId,
              this.hpForm.value.hp,
              this.hpForm.value.addHp
            )
            .subscribe();*/
        }
      });

    this.hpForm
      .get('addHp')
      ?.valueChanges.pipe(
        startWith(undefined),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.hpForm.value.hp > this.maxHp.nativeElement.value) {
          this.hpForm.patchValue({ hp: this.maxHp.nativeElement.value });
        } else {
          /*this._http
            .editCharacterHp(
              this.charId,
              this.hpForm.value.hp,
              this.hpForm.value.addHp
            )
            .subscribe();*/
        }
      });
  }

  reload(): void {
    this.character$ = this._characterService.loadCharacter(this.charId);
  }

  reloadCond(): void {
    //this.condition$ = this._characterService.getCharacterConditions(this.charId);
  }

  reloadItems(): void {
    /*this._http.getInventory(this.charId).subscribe((data) => {
      data.forEach((element) => {
        if (element.type == 0) {
          this.firstItem = element.name;
          this.firstItemId = element.id;
        }

        if (element.type == 1) {
          this.secondItem = element.name;
          this.secondItemId = element.id;
        }
      });
    });*/
  }

  editStats(): void {
    /*this._http
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
      });*/
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
    /*this._characterService.deleteCharacterCondition(this.charId, condId).subscribe({
      complete: () => {
        this._snackbar.open('Удаление успешно.');
        this.reloadCond();
      },
    });*/
  }

  editPriorityItems(): void {
    this._dialog
      .open(EditPriorityItemComponent, {
        data: {
          charId: this.charId,
          firstItem: this.firstItemId,
          secondItem: this.secondItemId,
        },
        width: '300px',
      })
      .afterClosed()
      .subscribe(() => this.reloadItems());
  }
}
