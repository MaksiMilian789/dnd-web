import { Component, Inject, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject, switchMap, tap } from 'rxjs';

import { WorkshopService } from '@core/services/api/workshop.service';
import { Spell } from '@core/models';
import { CreateSpellDialogComponent } from '../create-spell-dialog/create-spell-dialog.component';

@Component({
  selector: 'app-spells-list',
  templateUrl: './spells-list.component.html',
  styleUrls: ['./spells-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SpellsListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  spells: Signal<Spell[]>;

  dataSource!: MatTableDataSource<Spell>;
  columnsToDisplay = ['name', 'description', 'actions'];
  expandedElement!: Spell;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _workshopService: WorkshopService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
  ) {
    this.spells = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._workshopService.getSpells()),
        tap((val) => this.setData(val)),
      ),
      {
        initialValue: [],
      },
    );
    this.refresh();
  }

  refresh(): void {
    this._refresh$.next();
  }

  setData(data: Spell[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.itemsPerPageLabel = 'Состояний на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addItem(): void {
    this._dialogs
      .open<boolean>(new PolymorpheusComponent(CreateSpellDialogComponent), {
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
