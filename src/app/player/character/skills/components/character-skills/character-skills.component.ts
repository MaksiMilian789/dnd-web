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

import { Skill } from '@core/models';
import { AddSkillDialogComponent } from '../add-skill-dialog/add-skill-dialog.component';

@Component({
  selector: 'app-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.scss'],
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
export class CharacterSkillsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Skill>;
  columnsToDisplay = ['name', 'description', 'actions'];
  expandedElement!: Skill;

  constructor(
    //private _http: CharacterService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    /*this._http
      .getCharacterSkills(
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
      .open(AddSkillDialogComponent, {
        data: {
          charId: Number(this._route.snapshot.paramMap.get('characterId')),
          actualSkills: this.dataSource.data,
        },
        width: '80%',
      })
      .afterClosed()
      .subscribe(() => this.loadData());
  }

  deleteItem(id: number): void {
    /*this._http
      .deleteCharacterSkill(
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
