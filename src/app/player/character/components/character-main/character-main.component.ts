import { Component, HostListener, Inject, Signal, signal } from '@angular/core';
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
import { CalculateService } from '../../services/calculate.service';
import { SkillType } from '@core/enums';
import { Skill } from '@core/models';

const CLOSE_SIZE = 775;

@Component({
  selector: 'app-character-main',
  templateUrl: './character-main.component.html',
  styleUrls: ['./character-main.component.scss'],
  providers: [StatsSkillPipe],
})
export class CharacterMainComponent {
  charId: number = Number(this._route.snapshot.paramMap.get('characterId'));
  character: Signal<Character | null> = toSignal(this._characterService.loadCharacter(this.charId), {
    initialValue: null,
  });
  hpForm: FormGroup;

  skillTypes = SkillType;

  protected showSkills: FormControl<boolean>;

  protected masteryBonus = 0;

  private readonly _refresh$ = new Subject<void>();

  constructor(
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    @Inject(LOCAL_STORAGE) private readonly _localStorage: Storage,
    private _characterService: CharacterService,
    private _calculateService: CalculateService,
    private _route: ActivatedRoute,
    private _snackbar: MatSnackBar,
    public pipe: StatsSkillPipe,
  ) {
    this.hpForm = new FormGroup({
      hp: new FormControl(0, [Validators.required, Validators.min(0)]),
      addHp: new FormControl(0, [Validators.required, Validators.min(0)]),
    });

    const show = this._localStorage.getItem('show_skills_' + this.charId.toString());
    if (show) {
      this.showSkills = new FormControl<boolean>(show == 'true', { nonNullable: true });
    } else {
      this.showSkills = new FormControl<boolean>(window.innerHeight > 775, { nonNullable: true });
    }

    this.character = toSignal(
      this._refresh$.pipe(
        switchMap(() => this._characterService.loadCharacter(this.charId)),
        tap((val) => {
          this.hpForm.setValue({
            hp: val.hp,
            addHp: val.addHp,
          });
          this.masteryBonus = this._calculateService.calculateMasteryBonus(val.level);
        }),
      ),
      {
        initialValue: null,
      },
    );

    this.hpForm.valueChanges.pipe(debounceTime(500)).subscribe((val) => {
      this._characterService.editCharacterHp(this.charId, val.hp, val.addHp).subscribe();
    });

    this.showSkills.valueChanges.subscribe((val) => {
      this._localStorage.setItem('show_skills_' + this.charId.toString(), val.toString());
    });

    this.refresh();
  }

  refresh(): void {
    this._refresh$.next();
  }

  charInfo(): void {
    const data: CharInfoDialogData = {
      character: this.character()!,
    };

    this._dialogs
      .open<boolean>(new PolymorpheusComponent(CharInfoDialogComponent), {
        data: data,
        size: 'page',
        closeable: true,
        dismissible: true,
      })
      .subscribe((val) => {
        if (!!val) {
          this.refresh();
        }
      });
  }

  get modificator(): Characteristics {
    if (this.character()) {
      return {
        strength: modificator(
          this._calculateService.calculateEffectValue(
            SkillType.Strength,
            this.characterSkills(),
            0,
            this.character()!.characteristics.strength,
          ),
        ),
        dexterity: modificator(
          this._calculateService.calculateEffectValue(
            SkillType.Dexterity,
            this.characterSkills(),
            0,
            this.character()!.characteristics.dexterity,
          ),
        ),
        constitution: modificator(
          this._calculateService.calculateEffectValue(
            SkillType.Constitution,
            this.characterSkills(),
            0,
            this.character()!.characteristics.constitution,
          ),
        ),
        intelligence: modificator(
          this._calculateService.calculateEffectValue(
            SkillType.Intelligence,
            this.characterSkills(),
            0,
            this.character()!.characteristics.intelligence,
          ),
        ),
        wisdom: modificator(
          this._calculateService.calculateEffectValue(
            SkillType.Wisdom,
            this.characterSkills(),
            0,
            this.character()!.characteristics.wisdom,
          ),
        ),
        charisma: modificator(
          this._calculateService.calculateEffectValue(
            SkillType.Charisma,
            this.characterSkills(),
            0,
            this.character()!.characteristics.charisma,
          ),
        ),
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

  calculateSkillValue(type: SkillType, value: number): number {
    return this._calculateService.calculateEffectValue(type, this.characterSkills(), this.masteryBonus, value);
  }
  
  calculateSaveRollValue(type: SkillType, value: number): number {
    return this._calculateService.calculateEffectSaveRoll(type, this.characterSkills(), this.masteryBonus, value);
  }

  characterSkills(): Skill[] {
    if (!this.character()) {
      return [];
    }

    let data: Skill[] = [];
    this.character()!.skillInstance.forEach((element) => {
      if (element.passive || element.activated) data.push(element);
    });

    this.character()!.backgroundInstance.skillInstances.forEach((element) => {
      if (element.passive || element.activated) data.push(element);
    });

    this.character()!.classInstance.skillInstances.forEach((element) => {
      if (element.passive || element.activated) data.push(element);
    });

    this.character()!.raceInstance.skillInstances.forEach((element) => {
      if (element.passive || element.activated) data.push(element);
    });

    this.character()!.objectInstance.forEach((instance) => {
      if (instance.equipped) {
        instance.skillInstances.forEach((element) => {
          if (element.passive || element.activated) data.push(element);
        });
      }
    });

    this.character()!.spellInstance.forEach((instance) => {
      instance.skillInstances.forEach((element) => {
        if (element.passive || element.activated) data.push(element);
      });
    });
    
    this.character()!.conditions.forEach((instance) => {
      instance.skillInstances.forEach((element) => {
        if (element.passive || element.activated) data.push(element);
      });
    });
    return data;
  }

  get getArmor(): number {
    if (this.character()) {
      return this._calculateService.calculateArmor(
        this.characterSkills(),
        this.modificator.dexterity,
        this.character()!.objectInstance,
      );
    }
    return 0;
  }

  get getMaxHp(): number {
    if (this.character()) {
      return this._calculateService.calculateMaxHp(
        this.character()!.level,
        this.characterSkills(),
        this.modificator.constitution,
      );
    }
    return 0;
  }

  get getProfBonus(): number {
    return this.masteryBonus;
  }

  get getPerception(): number {
    let persp = this.calculateSkillValue(this.skillTypes.Perception, this.modificator.wisdom);
    return this._calculateService.calculatePassivePersption(this.characterSkills(), persp);
  }

  get getView(): string {
    return this._calculateService.calculatePriorityVision(this.characterSkills());
  }
}
