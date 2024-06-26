import { Component, Inject, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';;
import { TuiDialogService } from '@taiga-ui/core';
import { Subject, switchMap, tap } from 'rxjs';

import { Character, Spell } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { AddSpellDialogComponent, AddSpellDialogComponentData } from '../add-spell-dialog/add-spell-dialog.component';

@Component({
  selector: 'app-character-spells',
  templateUrl: './character-spells.component.html',
  styleUrls: ['./character-spells.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CharacterSpellsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character: Signal<Character | null>;

  dataSource!: MatTableDataSource<Spell>;
  columnsToDisplay = ['name', 'level', 'actions'];
  expandedElement!: Spell;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
  ) {    
    this.character = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._characterService.loadCharacter(this.charId)),
        tap((val) => this.setData(val)),
      ),
      {
        initialValue: null,
      },
    );
    this.refresh();
  }

  refresh(): void{    
    this._refresh$.next();
  }

  setData(character: Character): void {
    this.dataSource = new MatTableDataSource(character.spellInstance ?? []);
    this.paginator._intl.itemsPerPageLabel = 'Заклинаний на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addItem(): void {
    const data: AddSpellDialogComponentData = {
      character: this.character()!,
    };

    this._dialogs
      .open<boolean>(new PolymorpheusComponent(AddSpellDialogComponent), {
        data: data,
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
