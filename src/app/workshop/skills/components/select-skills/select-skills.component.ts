import { Component, Inject, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { Skill } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { FormControl } from '@angular/forms';
import { WorkshopService } from '@core/services/api/workshop.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SkillType } from '@core/enums';

export interface SelectSkillsComponentData {
  skills: Skill[];
  onlyPassvie: boolean;
  forCreateCharacter: boolean;
}

@Component({
  selector: 'app-select-skills',
  templateUrl: './select-skills.component.html',
  styleUrls: ['./select-skills.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SelectSkillsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Skill>;
  columnsToDisplay = ['name', 'type', 'actions'];
  expandedElement!: Skill;

  filter: string = '';
  hidden: FormControl<boolean> = new FormControl<boolean>(false, { nonNullable: true });

  allData: Skill[] = [];

  selection = new SelectionModel<Skill>(true);

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<Skill[], SelectSkillsComponentData>,
    private _characterService: CharacterService,
    private _workshopService: WorkshopService,
    private _snackbar: MatSnackBar,
    private _route: ActivatedRoute,
  ) {
    _workshopService.getSkills().subscribe((val) => {
      this.allData = val;
      this.setData();
    });

    this.hidden.valueChanges.subscribe(() => this.setData());
  }

  applyTextFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  setData(): void {
    let data = this.allData.filter(
      (val) => val.hidden == this.hidden.value && val.passive == this.context.data.onlyPassvie,
    );

    if(this.context.data.forCreateCharacter){
      data = data.filter((val) => (val.skillType >= SkillType.Athletics && val.skillType <= SkillType.Persuasion) || val.skillType == SkillType.Language);
    }

    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.itemsPerPageLabel = 'Способностей на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    let select = data;
    this.selection.select(...select.filter((val) => this.context.data.skills.some((x) => x.id == val.id)));
  }

  save(): void {
    this.context.completeWith(this.selection.selected);
  }
}
