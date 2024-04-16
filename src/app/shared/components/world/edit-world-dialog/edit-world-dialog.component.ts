import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@core/services/api/world.service';

@Component({
  selector: 'app-edit-world-dialog',
  templateUrl: './edit-world-dialog.component.html',
  styleUrls: ['./edit-world-dialog.component.scss']
})
export class EditWorldDialogComponent {
  addForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<EditWorldDialogComponent>,
    private _http: HttpService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number, name: string; description: string }
  ) {
    this.addForm = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
    });
  }

  edit() {
    this._http
      .editWorld(
        this.data.id,
        this.addForm.value.name,
        this.addForm.value.description
      )
      .subscribe({
        complete: () => {
          this._snackbar.open('Изменение успешно.');
        },
      });
    this._dialogRef.close(true);
  }
}
