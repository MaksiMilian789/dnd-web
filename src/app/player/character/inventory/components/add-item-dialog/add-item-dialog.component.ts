import { Component, Inject, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { Character, Inventory } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { FormControl } from '@angular/forms';

export interface AddInventoryDialogComponentData {
  character: Character;
}

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AddItemDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Inventory>;
  columnsToDisplay = ['name', 'quantity', 'actions'];
  expandedElement!: Inventory;

  filter: string = '';
  hidden: FormControl<boolean> = new FormControl<boolean>(false, { nonNullable: true });

  allData: Inventory[] = [];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean, AddInventoryDialogComponentData>,
    private _characterService: CharacterService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
  ) {
    /*_characterService.get().subscribe((val) => {
      this.allData = val;
      this.setData();
    });*/

    this.hidden.valueChanges.subscribe(() => this.setData());
  }

  applyTextFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  setData(): void {
    let data = this.allData;
    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.itemsPerPageLabel = 'Предметов на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  add(objectId: number) {
    /*this._characterService.addCharacterSkill(this.context.data.character.id!, skillId).subscribe({
      complete: () => {
        this._snackbar.open('Добавление успешно.');
      },
    });*/
  }
}

