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

import { Character, Condition } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { WorkshopService } from '@core/services/api/workshop.service';
import { CreateConditionDialogComponent } from '../create-condition-dialog/create-condition-dialog.component';

@Component({
  selector: 'app-conditions-list',
  templateUrl: './conditions-list.component.html',
  styleUrls: ['./conditions-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConditionsListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  conditions: Signal<Condition[]>;

  dataSource!: MatTableDataSource<Condition>;
  columnsToDisplay = ['name', 'description', 'actions'];
  expandedElement!: Condition;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _workshopService: WorkshopService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
  ) {
    this.conditions = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._workshopService.getConditions()),
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

  setData(data: Condition[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.itemsPerPageLabel = 'Состояний на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addItem(): void {
    this._dialogs
      .open<boolean>(new PolymorpheusComponent(CreateConditionDialogComponent), {
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
