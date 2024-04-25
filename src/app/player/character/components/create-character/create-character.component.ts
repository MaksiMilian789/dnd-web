import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { GENDER_LOCALIZATION, Gender, IDEOLOGY_LOCALIZATION, Ideology } from '@core/enums';
import { Class, Race } from '@core/models';
import { CharacterService } from '@core/services/api/character.service';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
})
export class CreateCharacterComponent {
  completedStep1: boolean = false;
  completedStep2: boolean = false;
  completedStep3: boolean = false;

  protected readonly form1: FormGroup;
  protected readonly form2: FormGroup;
  protected readonly form3: FormGroup;

  protected readonly genders = GENDER_LOCALIZATION;
  protected readonly ideologies = IDEOLOGY_LOCALIZATION;

  protected readonly races: Signal<Race[]>;
  protected raceDescription: string = "";

  protected readonly classes: Signal<Class[]>;
  protected classDescription: string = "";

  constructor(private _characterService: CharacterService) {
    this.form1 = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: Validators.required }),
      gender: new FormControl(0, { nonNullable: true, validators: Validators.required }),
      age: new FormControl(1, { nonNullable: true, validators: Validators.required }),
      ideology: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    });

    this.form2 = new FormGroup({
      class: new FormControl(null, { validators: Validators.required }),
      race: new FormControl(null, { validators: Validators.required }),
    });

    this.form3 = new FormGroup({});

    this.races = toSignal(this._characterService.getRaces(), { initialValue: [] });
    this.classes = toSignal(this._characterService.getClasses(), { initialValue: [] });

    this.form2.valueChanges.subscribe((val) => {
      if(val.race){
        this.raceDescription = this.races().find((x) => x.id == val.race)?.description || '';
      }
      if(val.class){
        this.classDescription = this.classes().find((x) => x.id == val.class)?.description || '';
      }
    })
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

  createCharacter(): void {}

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
}
