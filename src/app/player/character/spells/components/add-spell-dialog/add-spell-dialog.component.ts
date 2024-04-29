import { Component, Inject, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { Character, Spell } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { FormControl } from '@angular/forms';

export interface AddSpellDialogComponentData {
  character: Character;
}

@Component({
  selector: 'app-add-spell-dialog',
  templateUrl: './add-spell-dialog.component.html',
  styleUrls: ['./add-spell-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AddSpellDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Spell>;
  columnsToDisplay = ['name', 'level', 'actions'];
  expandedElement!: Spell;

  filter: string = '';
  hidden: FormControl<boolean> = new FormControl<boolean>(false, { nonNullable: true });

  allData: Spell[] = [];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean, AddSpellDialogComponentData>,
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
    this.paginator._intl.itemsPerPageLabel = 'Заклинаний на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  add(spellId: number) {
    /*this._characterService.addCharacterSkill(this.context.data.character.id!, skillId).subscribe({
      complete: () => {
        this._snackbar.open('Добавление успешно.');
      },
    });*/
  }
}


