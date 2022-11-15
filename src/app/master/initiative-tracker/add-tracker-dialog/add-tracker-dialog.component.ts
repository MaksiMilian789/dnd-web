import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Unit } from 'src/app/shared/models/unit';

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
      name: new FormControl('', Validators.required),
      initiative: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });
  }

  add() {
    let newUnit: Unit = {
      name: this.addForm.value.name,
      initiative: this.addForm.value.initiative,
      color: this.addForm.value.color,
    };
    this._dialogRef.close(newUnit);
  }
}
