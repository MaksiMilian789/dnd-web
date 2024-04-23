import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

import { Inventory } from 'src/app/core/models/inventory.model';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CharacterInventoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Inventory>;
  columnsToDisplay = ['name', 'description', 'actions'];
  expandedElement!: Inventory;

  constructor(
    //private _http: HttpService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    /*this._http
      .getInventory(Number(this._route.snapshot.paramMap.get('characterId')))
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.paginator._intl.itemsPerPageLabel = '';
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });*/
  }

  addItem(): void {
    this._dialog
      .open(AddItemDialogComponent, {
        data: {
          charId: Number(this._route.snapshot.paramMap.get('characterId')),
          actualItems: this.dataSource.data
        },
        width: '80%',
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  deleteItem(id: number): void {
    /*this._http.deleteCharacterItem(id).subscribe({
      complete: () => {
        this._snackbar.open('Удаление успешно.');
        this.loadData();
      },
    });*/
  }
}
