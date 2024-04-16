import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { Spell } from 'src/app/core/models/spell.model';
import { HttpService } from '@core/services/api/world.service';

@Component({
  selector: 'app-add-spell-dialog',
  templateUrl: './add-spell-dialog.component.html',
  styleUrls: ['./add-spell-dialog.component.scss'],
})
export class AddSpellDialogComponent {
  addForm: FormGroup;

  spells$: Observable<Spell[]>;

  description: string = 'Описание выбранного заклинания';

  constructor(
    private _dialogRef: MatDialogRef<AddSpellDialogComponent>,
    private _http: HttpService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: { charId: number; actualSpells: Spell[] }
  ) {
    this.addForm = new FormGroup({
      spell: new FormControl('', Validators.required),
    });

    this.spells$ = this._http
      .getSpells()
      .pipe(map((res) => res.filter((val) => this.filterItems(val))));
  }

  filterItems(val: Item): boolean {
    return this.data.actualSpells.find((x) => x.id == val.id) == undefined;
  }

  add() {
    this._http
      .addCharacterSpell(this.data.charId, this.addForm.value.spell)
      .subscribe({
        complete: () => {
          this._snackbar.open('Добавление успешно.');
        },
      });
    this._dialogRef.close(true);
  }

  changeDescription(description: string): void {
    this.description = description;
  }
}
