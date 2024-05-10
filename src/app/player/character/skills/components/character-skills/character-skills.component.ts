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

import { Character, Skill } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { AddSkillDialogComponent, AddSkillDialogComponentData } from '../add-skill-dialog/add-skill-dialog.component';

@Component({
  selector: 'app-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CharacterSkillsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character: Signal<Character | null>;

  dataSource!: MatTableDataSource<Skill>;
  columnsToDisplay = ['name', 'type', 'actions'];
  expandedElement!: Skill;

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

  refresh(): void {
    this._refresh$.next();
  }

  setData(character: Character): void {
    let data: Skill[] = [];
    character.skillInstance.forEach((element) => {
      data.push(element);
    });

    character.backgroundInstance.skillInstances.forEach((element) => {
      data.push(element);
    });

    character.classInstance.skillInstances.forEach((element) => {
      data.push(element);
    });

    character.raceInstance.skillInstances.forEach((element) => {
      data.push(element);
    });

    character.objectInstance.forEach((instance) => {
      instance.skillInstances.forEach((element) => {
        data.push(element);
      });
    });

    character.spellInstance.forEach((instance) => {
      instance.skillInstances.forEach((element) => {
        data.push(element);
      });
    });

    this.dataSource = new MatTableDataSource(data);
    this.paginator._intl.itemsPerPageLabel = 'Способностей на страницу';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleItem(skill: Skill): void {
    if (!skill.activated) {
      skill.currentCharges -= 1;
      skill.activated = true;
      this._characterService.toggleSkill(this.charId, skill.id, true).subscribe();
      this._snackbar.open(
        'Способность переведена в активное состояние. Потрачен 1 заряд. Осталось ' + skill.currentCharges + '!',
      );
    } else {
      this._characterService.toggleSkill(this.charId, skill.id, false, 0).subscribe();
      this._snackbar.open('Способность отключена!');
    }
  }

  activateInstantSkill(skill: Skill): void {
    skill.currentCharges -= 1;
    this._snackbar.open(
      'Способность использовна. Потрачен 1 заряд. Осталось ' + skill.currentCharges + '!',
    );
    this._characterService.toggleSkill(this.charId, skill.id, false).subscribe();
  }

  resetSkillCharges(skill: Skill): void {
    this._characterService.resetSkillCharges(this.charId, skill.id).subscribe();
    skill.currentCharges = skill.charges;
  }

  canToggle(skill: Skill): boolean {
    return skill.currentCharges > 0 || skill.activated;
  }

  addItem(): void {
    const data: AddSkillDialogComponentData = {
      character: this.character()!,
    };

    this._dialogs
      .open<boolean>(new PolymorpheusComponent(AddSkillDialogComponent), {
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
