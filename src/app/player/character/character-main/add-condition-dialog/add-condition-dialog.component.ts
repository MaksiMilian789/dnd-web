import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Character } from '@core/models/character/character.model';
import { Condition } from 'src/app/core/models/condition.model';
import { HttpService } from '@core/services/api/world.service';

@Component({
  selector: 'app-add-condition-dialog',
  templateUrl: './add-condition-dialog.component.html',
  styleUrls: ['./add-condition-dialog.component.scss'],
})
export class AddConditionDialogComponent {
  addForm: FormGroup;

  conditions$: Observable<Condition[]>;

  description: string = 'Описание состояния.';

  constructor(
    private _dialogRef: MatDialogRef<AddConditionDialogComponent>,
    private _http: HttpService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { charId: number }
  ) {
    this.addForm = new FormGroup({
      cond: new FormControl('', Validators.required),
    });

    this.conditions$ = this._http.getConditions();
  }

  add() {
    this._http
      .addCharacterCondition(this.data.charId, this.addForm.value.cond)
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
