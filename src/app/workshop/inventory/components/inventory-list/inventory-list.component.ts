import { Component, Inject, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject, switchMap, tap } from 'rxjs';

import { WorkshopService } from '@core/services/api/workshop.service';
import { Inventory } from '@core/models';
import { CreateObjectDialogComponent } from '../create-object-dialog/create-object-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InventoryListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  substr: number = 0;

  inventories: Signal<Inventory[]>;

  dataSource!: MatTableDataSource<Inventory>;
  columnsToDisplay = ['name', 'description', 'actions'];
  expandedElement!: Inventory;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _workshopService: WorkshopService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
  ) {
    this.inventories = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._workshopService.getInventoryObjects()),
        tap((val) => this.setData(val)),
      ),
      {
        initialValue: [],
      },
    );
    this.refresh();

    let width = window.innerWidth;
    this.substr = Math.round(width/30);
  }

  refresh(): void {
    this._refresh$.next();
  }

  setData(data: Inventory[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.itemsPerPageLabel = 'Предметов на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addItem(): void {
    this._dialogs
      .open<boolean>(new PolymorpheusComponent(CreateObjectDialogComponent), {
        size: 'page',
        closeable: true,
      })
      .subscribe({
        complete: () => {
            this.refresh();
        },
    });
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
