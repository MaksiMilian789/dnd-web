import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TrackerUnit } from 'src/app/shared/models/tracker-unit';

@Component({
  selector: 'app-add-tracker-dialog',
  templateUrl: './add-tracker-dialog.component.html',
  styleUrls: ['./add-tracker-dialog.component.scss'],
})
export class AddTrackerDialogComponent {
  addForm: FormGroup;

  colors = ['red', 'green', 'yellow'];

  constructor(private _dialogRef: MatDialogRef<AddTrackerDialogComponent>) {
    this.addForm = new FormGroup({
      charName: new FormControl('', Validators.required),
      initiative: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });
  }

  add() {
    let newUnit: TrackerUnit = {
      charName: this.addForm.value.charName,
      initiative: this.addForm.value.initiative,
      color: this.addForm.value.color,
    };
    this._dialogRef.close(newUnit);
  }
}
