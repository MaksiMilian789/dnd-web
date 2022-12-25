import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { Inventory } from 'src/app/shared/models/inventory.model';
import { Item } from 'src/app/shared/models/item.model';
import { HttpService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss'],
})
export class AddItemDialogComponent {
  addForm: FormGroup;

  items$: Observable<Item[]>;

  description: string = 'Описание выбранного предмета';

  constructor(
    private _dialogRef: MatDialogRef<AddItemDialogComponent>,
    private _http: HttpService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: { charId: number; actualItems: Inventory[] }
  ) {
    this.addForm = new FormGroup({
      item: new FormControl('', Validators.required),
    });

    this.items$ = this._http
      .getItems()
      .pipe(map((res) => res.filter((val) => this.filterItems(val))));
  }

  filterItems(val: Item): boolean {
    return (
      this.data.actualItems.find((x) => x.objectId == val.id) == undefined
    );
  }

  add() {
    this._http
      .addCharacterItem(this.data.charId, this.addForm.value.item)
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
