import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Skill } from '@core/models';

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.scss'],
})
export class AddSkillDialogComponent {
  addForm: FormGroup;

  //skills$: Observable<Skill[]>;

  description: string = 'Описание выбранного умения';

  constructor(
    private _dialogRef: MatDialogRef<AddSkillDialogComponent>,
    //private _http: HttpService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: { charId: number; actualSkills: Skill[] }
  ) {
    this.addForm = new FormGroup({
      skill: new FormControl('', Validators.required),
    });

    /*this.skills$ = this._http
      .getSkills()
      .pipe(map((res) => res.filter((val) => this.filterItems(val))));*/
  }

  filterItems(val: Skill): boolean {
    return this.data.actualSkills.find((x) => x.id == val.id) == undefined;
  }

  add() {
    /*this._http
      .addCharacterSkill(this.data.charId, this.addForm.value.skill)
      .subscribe({
        complete: () => {
          this._snackbar.open('Добавление успешно.');
        },
      });*/
    this._dialogRef.close(true);
  }

  changeDescription(description: string): void {
    this.description = description;
  }
}
