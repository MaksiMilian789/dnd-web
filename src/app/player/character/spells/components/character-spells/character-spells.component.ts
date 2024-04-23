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
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { Spell } from 'src/app/core/models/spell.model';
import { AddSpellDialogComponent } from '../add-spell-dialog/add-spell-dialog.component';

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.component.html',
  styleUrls: ['./character-spells.component.scss'],
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
export class CharacterSpellsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Spell>;
  columnsToDisplay = ['name', 'level', 'actions'];
  expandedElement!: Spell;

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
      .getCharacterSpells(
        Number(this._route.snapshot.paramMap.get('characterId'))
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.paginator._intl.itemsPerPageLabel = '';
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });*/
  }

  addItem(): void {
    this._dialog
      .open(AddSpellDialogComponent, {
        data: {
          charId: Number(this._route.snapshot.paramMap.get('characterId')),
          actualSpells: this.dataSource.data,
        },
        width: '80%',
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  deleteItem(id: number): void {
    /*this._http
      .deleteCharacterSpell(
        Number(this._route.snapshot.paramMap.get('characterId')),
        id
      )
      .subscribe({
        complete: () => {
          this._snackbar.open('Удаление успешно.');
          this.loadData();
        },
      });*/
  }
}
