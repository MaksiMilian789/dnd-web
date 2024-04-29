import { Component, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, tap } from 'rxjs';

import { Character } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { Inventory } from '@core/models/character/inventory.model';
import { combineReload } from '@shared/utils/rxjs';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';

@Component({
  selector: 'app-character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CharacterInventoryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character: Signal<Character | null>;

  dataSource!: MatTableDataSource<Inventory>;
  columnsToDisplay = ['name', 'quantity', 'actions'];
  expandedElement!: Inventory;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
  ) {
    this.character = toSignal(
      combineReload(
        this._characterService.loadCharacter(this.charId).pipe(tap((val) => this.setData(val))),
        this._refresh$,
      ),
      {
        initialValue: null,
      },
    );
  }

  setData(character: Character): void {
    this.dataSource = new MatTableDataSource(character.objectInstance ?? []);
    this.paginator._intl.itemsPerPageLabel = 'Предметов на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addItem(): void {
    this._dialog
      .open(AddItemDialogComponent, {
        data: {
          charId: this.character()?.id,
          actualItems: this.dataSource.data,
        },
        width: '80%',
      })
      .afterClosed()
      .subscribe(() => this._refresh$.next());
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
