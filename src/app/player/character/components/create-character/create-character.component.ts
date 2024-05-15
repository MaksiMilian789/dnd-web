import { Component, Inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { GENDER_LOCALIZATION, Gender, IDEOLOGY_LOCALIZATION, Ideology, System } from '@core/enums';
import { Background, CharacterWithId, Class, Race, Skill } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { CharacteristicsDialogComponent } from '../characteristics-dialog/characteristics-dialog.component';
import { Characteristics } from '@core/models/character/characteristics.model';
import { AuthService } from '@core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkshopService } from '@core/services/api/workshop.service';
import {
  SelectSkillsComponentData,
  SelectSkillsComponent,
} from 'src/app/workshop/skills/components/select-skills/select-skills.component';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
})
export class CreateCharacterComponent {
  completedStep1: boolean = false;
  completedStep2: boolean = false;
  completedStep3: boolean = false;

  infoValue: Race | Background | Class | null = null;
  openInfo = false;

  characteristics: Characteristics | null = null;
  skills: Skill[] = [];

  protected readonly form1: FormGroup;
  protected readonly form2: FormGroup;
  protected readonly form3: FormGroup;

  protected readonly genders = GENDER_LOCALIZATION;
  protected readonly ideologies = IDEOLOGY_LOCALIZATION;

  protected readonly races: Signal<Race[]>;
  protected raceDescription: string = '';

  protected readonly backgrounds: Signal<Background[]>;
  protected backgroundDescription: string = '';

  protected readonly classes: Signal<Class[]>;
  protected classDescription: string = '';

  constructor(
    private _workshopService: WorkshopService,
    private _characterService: CharacterService,
    private _auth: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router,
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
  ) {
    this.form1 = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: Validators.required }),
      gender: new FormControl(0, { nonNullable: true, validators: Validators.required }),
      age: new FormControl(1, { nonNullable: true, validators: Validators.required }),
      ideology: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    });

    this.form2 = new FormGroup({
      race: new FormControl(null, { validators: Validators.required }),
      background: new FormControl(null, { validators: Validators.required }),
    });

    this.form3 = new FormGroup({
      class: new FormControl(null, { validators: Validators.required }),
    });

    this.backgrounds = toSignal(this._workshopService.getBackgrounds(), { initialValue: [] });
    this.races = toSignal(this._workshopService.getRaces(), { initialValue: [] });
    this.classes = toSignal(this._workshopService.getClasses(), { initialValue: [] });

    this.form2.valueChanges.subscribe((val) => {
      if (val.race) {
        this.raceDescription = this.races().find((x) => x.id == val.race)?.description || '';
      }
      if (val.background) {
        this.backgroundDescription = this.backgrounds().find((x) => x.id == val.background)?.description || '';
      }
    });

    this.form3.valueChanges.subscribe((val) => {
      if (val.class) {
        this.classDescription = this.classes().find((x) => x.id == val.class)?.description || '';
      }
    });
  }

  step1(stepper: MatStepper): void {
    this.completedStep1 = true;
    this.completedStep2 = false;
    this.completedStep3 = false;
    setTimeout(() => {
      stepper.next();
    }, 100);
  }

  step2(stepper: MatStepper): void {
    this.completedStep2 = true;
    this.completedStep3 = false;
    setTimeout(() => {
      stepper.next();
    }, 10);
  }

  createCharacteristics(): void {
    //TODO: учесть бонусы от расы из скиллов
    this._dialogs
      .open<Characteristics | null>(new PolymorpheusComponent(CharacteristicsDialogComponent), {
        size: 'page',
        closeable: true,
        dismissible: true,
      })
      .subscribe((val) => {
        if (val != null) {
          this.characteristics = val;
        }
      });
  }

  chooseSkills(): void {
    const data: SelectSkillsComponentData = {
      skills: this.skills,
      onlyPassvie: true,
      forCreateCharacter: true,
    };

    this._dialogs
      .open<Skill[]>(new PolymorpheusComponent(SelectSkillsComponent), {
        data: data,
        size: 'page',
        closeable: false,
      })
      .subscribe((val) => {
        this.skills = val;
      });
  }

  createCharacter(): void {
    let skillIds: number[] = this.skills.map((x) => x.id);
    const character: CharacterWithId = {
      age: this.form1.controls['age'].value,
      gender: this.form1.controls['gender'].value,
      ideology: this.form1.controls['ideology'].value,
      characteristics: this.characteristics!,
      classId: this.form3.controls['class'].value,
      raceId: this.form2.controls['race'].value,
      backgroundId: this.form2.controls['background'].value,
      name: this.form1.controls['name'].value,
      level: 1,
      system: System.Dnd,
      skillIds: skillIds,
    };

    this._characterService.createCharacter(character, this._auth.currentUser?.id!).subscribe(() => {
      this._snackbar.open('Создание персонажа успешно');
      this._router.navigate(['/player/characters']);
    });
  }

  getRace(): Race {
    return this.races().find((x) => x.id == this.form2.controls['race'].value)!;
  }

  getClass(): Class {
    return this.classes().find((x) => x.id == this.form3.controls['class'].value)!;
  }

  getBackground(): Background {
    return this.backgrounds().find((x) => x.id == this.form2.controls['background'].value)!;
  }

  openInfoDialog(val: Race | Background | Class): void {
    if (val.skillInstances.length > 0) {
      this.infoValue = val;
      this.openInfo = true;
    } else {
      this._snackbar.open('Нет способностей');
    }
  }

  @tuiPure
  protected stringifyGender(): TuiStringHandler<Gender> {
    return (value: Gender) => GENDER_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyIdeology(): TuiStringHandler<Ideology> {
    return (value: Ideology) => IDEOLOGY_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyRace(): TuiStringHandler<number> {
    return (value: number) => this.races().find((x) => x.id == value)?.name || '';
  }

  @tuiPure
  protected stringifyClass(): TuiStringHandler<number> {
    return (value: number) => this.classes().find((x) => x.id == value)?.name || '';
  }

  @tuiPure
  protected stringifyBackground(): TuiStringHandler<number> {
    return (value: number) => this.backgrounds().find((x) => x.id == value)?.name || '';
  }
}
