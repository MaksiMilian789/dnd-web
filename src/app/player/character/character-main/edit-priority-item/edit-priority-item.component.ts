import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, forkJoin } from 'rxjs';
import { Inventory } from 'src/app/core/models/inventory.model';
import { Item } from 'src/app/core/models/item.model';
import { HttpService } from 'src/app/core/services/api/http-service.service';

@Component({
  selector: 'app-edit-priority-item',
  templateUrl: './edit-priority-item.component.html',
  styleUrls: ['./edit-priority-item.component.scss'],
})
export class EditPriorityItemComponent {
  addForm: FormGroup;

  items$: Observable<Item[]>;

  description: string = 'Описание выбранного предмета';

  constructor(
    private _dialogRef: MatDialogRef<EditPriorityItemComponent>,
    private _http: HttpService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { charId: number, firstItem: number, secondItem: number }
  ) {
    this.addForm = new FormGroup({
      firtsItem: new FormControl(0),
      secondItem: new FormControl(0),
    });

    this.items$ = this._http.getInventory(this.data.charId);

    this.items$.subscribe((data) => {
      data.forEach((element) => {
        if (element.id == this.data.firstItem) {
          this.addForm.patchValue({firtsItem: element.id});
        }

        if (element.id == this.data.secondItem) {
          this.addForm.patchValue({secondItem: element.id});
        }
      });
    });
  }

  save() {
    if (
      this.addForm.value.firtsItem != 0 &&
      this.addForm.value.secondItem != 0
    ) {
      forkJoin(
        this._http.editPriorityObject(this.addForm.value.firtsItem, 0),
        this._http.editPriorityObject(this.addForm.value.secondItem, 1)
      ).subscribe({
        complete: () => {
          this._snackbar.open('Изменение успешно.');
        },
      });
    } else if (this.addForm.value.firtsItem != 0) {
      this._http.editPriorityObject(this.addForm.value.firtsItem, 0).subscribe({
        complete: () => {
          this._snackbar.open('Изменение успешно.');
        },
      });
    } else if (this.addForm.value.secondItem != 0) {
      this._http
        .editPriorityObject(this.addForm.value.secondItem, 1)
        .subscribe({
          complete: () => {
            this._snackbar.open('Изменение успешно.');
          },
        });
    }
    this._dialogRef.close(true);
  }
}
