import { Component, Inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';

import { Character } from '@core/models/character/character.model';
import { StatsSkillPipe } from 'src/app/shared/pipes/stats-skill.pipe';
import { CharacterService } from '@core/services/api/character.service';
import { Characteristics } from '@core/models/character/characteristics.model';
import { modificator } from '@shared/utils/modificator';
import { CharInfoDialogComponent, CharInfoDialogData } from '../char-info-dialog/char-info-dialog.component';
import { AddConditionDialogComponent, AddConditionDialogComponentData } from '../../conditions/components/add-condition-dialog/add-condition-dialog.component';

@Component({
  selector: 'app-character-battle',
  templateUrl: './character-battle.component.html',
  styleUrls: ['./character-battle.component.scss'],
  providers: [StatsSkillPipe],
})
export class CharacterBattleComponent {
  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character: Signal<Character | null>;
  hpForm: FormGroup;

  concentration: FormControl<boolean>;
  protected showEnergy: FormControl<boolean>;
  protected showSpellSlots: FormControl<boolean>;
  protected showConditions: FormControl<boolean>;
  protected openConditions: boolean = false;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    @Inject(LOCAL_STORAGE) private readonly _localStorage: Storage,
    private _characterService: CharacterService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    public pipe: StatsSkillPipe,
  ) {
    const conc = this._localStorage.getItem('concentration_' + this.charId.toString());
    this.concentration = new FormControl<boolean>(conc == 'true', { nonNullable: true });

    this.hpForm = new FormGroup({
      hp: new FormControl(0, [Validators.required, Validators.min(0)]),
      addHp: new FormControl(0, [Validators.required, Validators.min(0)]),
    });

    const showEnergy = this._localStorage.getItem('show_energy_' + this.charId.toString());
    this.showEnergy = new FormControl<boolean>(showEnergy == 'true', { nonNullable: true });

    const showSpellSlots = this._localStorage.getItem('show_spell_slots_' + this.charId.toString());
    this.showSpellSlots = new FormControl<boolean>(showSpellSlots == 'true', { nonNullable: true });

    const showConditions = this._localStorage.getItem('show_conditions_' + this.charId.toString());
    if (showConditions) {
      this.showConditions = new FormControl<boolean>(showConditions == 'true', { nonNullable: true });
    } else {
      this.showConditions = new FormControl<boolean>(window.innerHeight > 775, { nonNullable: true });
    }

    this.character = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._characterService.loadCharacter(this.charId)),
        tap((val) => {
          this.hpForm.setValue({
            hp: val.hp,
            addHp: val.addHp,
          });
        }),
      ),
      {
        initialValue: null,
      },
    );

    this.hpForm.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this._characterService.editCharacterHp(this.charId, val.hp, val.addHp).subscribe();
    });

    this.concentration.valueChanges.subscribe((val) => {
      this._localStorage.setItem('concentration_' + this.charId.toString(), val.toString());
    });

    this.showEnergy.valueChanges.subscribe((val) => {
      this._localStorage.setItem('show_energy_' + this.charId.toString(), val.toString());
    });

    this.showSpellSlots.valueChanges.subscribe((val) => {
      this._localStorage.setItem('show_spell_slots_' + this.charId.toString(), val.toString());
    });

    this.showConditions.valueChanges.subscribe((val) => {
      this._localStorage.setItem('show_conditions_' + this.charId.toString(), val.toString());
    });

    this.refresh();
  }

  refresh(): void {
    this._refresh$.next();
  }

  toggleConcentration(): void {}

  charInfo(): void {
    const data: CharInfoDialogData = {
      character: this.character()!,
    };

    this._dialogs
      .open(new PolymorpheusComponent(CharInfoDialogComponent), {
        data: data,
        size: 'page',
        closeable: true,
        dismissible: true,
      })
      .subscribe();
  }

  addCondition(): void {
    const data: AddConditionDialogComponentData = {
      character: this.character()!,
    };

    this._dialogs
      .open<boolean>(new PolymorpheusComponent(AddConditionDialogComponent), {
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

  get modificator(): Characteristics {
    if (this.character()) {
      return {
        strength: modificator(this.character()!.characteristics.strength + this.bonus.strength),
        dexterity: modificator(this.character()!.characteristics.dexterity + this.bonus.dexterity),
        constitution: modificator(this.character()!.characteristics.constitution + this.bonus.constitution),
        intelligence: modificator(this.character()!.characteristics.intelligence + this.bonus.intelligence),
        wisdom: modificator(this.character()!.characteristics.wisdom + this.bonus.wisdom),
        charisma: modificator(this.character()!.characteristics.charisma + this.bonus.charisma),
      };
    } else {
      return {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      };
    }
  }

  get bonus(): Characteristics {
    //TODO: взять со skills
    return {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };
  }

  get getArmor(): number {
    return 15;
  }

  get getMaxHp(): number {
    return 135;
  }

  get getProfBonus(): number {
    return 6;
  }

  get getSpeed(): number {
    return 30;
  }

  get getInitiative(): number {
    return 15;
  }
}
