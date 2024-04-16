import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@core/services/api/world.service';

@Component({
  selector: 'app-add-world-dialog',
  templateUrl: './add-world-dialog.component.html',
  styleUrls: ['./add-world-dialog.component.scss'],
})
export class AddWorldDialogComponent {
  addForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AddWorldDialogComponent>,
    private _http: HttpService,
    private _snackbar: MatSnackBar
  ) {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  add() {
    this._http
      .createWorld(
        sessionStorage.getItem('auth') as string,
        this.addForm.value.name,
        this.addForm.value.description
      )
      .subscribe({
        complete: () => {
          this._snackbar.open('Добавление успешно.');
        },
      });
    this._dialogRef.close(true);
  }
}
