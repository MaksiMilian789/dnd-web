import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WorldService } from '@core/services/api/world.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-add-world-dialog',
  templateUrl: './add-world-dialog.component.html',
  styleUrls: ['./add-world-dialog.component.scss'],
})
export class AddWorldDialogComponent {
  addForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AddWorldDialogComponent>,
    private _worldService: WorldService,
    private _auth: AuthService,
    private _snackbar: MatSnackBar
  ) {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  add() {
    this._worldService
      .createWorld(
        this._auth.currentUser?.id ?? 0,
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
