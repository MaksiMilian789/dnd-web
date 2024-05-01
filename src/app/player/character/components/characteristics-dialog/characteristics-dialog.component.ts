import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Characteristics } from '@core/models/character/characteristics.model';
import { modificator } from '@shared/utils/modificator';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-characteristics-dialog',
  templateUrl: './characteristics-dialog.component.html',
  styleUrl: './characteristics-dialog.component.scss',
})
export class CharacteristicsDialogComponent {
  protected standard = true;
  protected pointBy = false;
  protected custom = false;

  standardForm = new FormGroup({
    strength: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    dexterity: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    constitution: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    intelligence: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    wisdom: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    charisma: new FormControl(8, { nonNullable: true, validators: Validators.required }),
  });

  pointByForm = new FormGroup({
    strength: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    dexterity: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    constitution: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    intelligence: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    wisdom: new FormControl(8, { nonNullable: true, validators: Validators.required }),
    charisma: new FormControl(8, { nonNullable: true, validators: Validators.required }),
  });

  customForm = new FormGroup({
    strength: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    dexterity: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    constitution: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    intelligence: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    wisdom: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    charisma: new FormControl(0, { nonNullable: true, validators: Validators.required }),
  });

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<Characteristics | null>) {}

  close(): void {
    this.context.completeWith(null);
  }

  createCharacter(): void {
    let characteristics: Characteristics = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };
    if (this.standard) {
      characteristics = {
        strength: this.standardForm.controls.strength.value,
        dexterity: this.standardForm.controls.dexterity.value,
        constitution: this.standardForm.controls.constitution.value,
        intelligence: this.standardForm.controls.intelligence.value,
        wisdom: this.standardForm.controls.wisdom.value,
        charisma: this.standardForm.controls.charisma.value,
      };
    }
    if (this.pointBy) {
      characteristics = {
        strength: this.pointByForm.controls.strength.value,
        dexterity: this.pointByForm.controls.dexterity.value,
        constitution: this.pointByForm.controls.constitution.value,
        intelligence: this.pointByForm.controls.intelligence.value,
        wisdom: this.pointByForm.controls.wisdom.value,
        charisma: this.pointByForm.controls.charisma.value,
      };
    }
    if (this.custom) {
      characteristics = {
        strength: this.customForm.controls.strength.value,
        dexterity: this.customForm.controls.dexterity.value,
        constitution: this.customForm.controls.constitution.value,
        intelligence: this.customForm.controls.intelligence.value,
        wisdom: this.customForm.controls.wisdom.value,
        charisma: this.customForm.controls.charisma.value,
      };
    }
    this.context.completeWith(characteristics);
  }

  useStandard(): void {
    this.standard = true;
    this.pointBy = false;
    this.custom = false;
  }

  usePointBy(): void {
    this.standard = false;
    this.pointBy = true;
    this.custom = false;
  }

  useCustom(): void {
    this.standard = false;
    this.pointBy = false;
    this.custom = true;
  }

  pointBySum(): number {
    return (
      this.calculatePoint(this.pointByForm.controls.strength.value) +
      this.calculatePoint(this.pointByForm.controls.dexterity.value) +
      this.calculatePoint(this.pointByForm.controls.constitution.value) +
      this.calculatePoint(this.pointByForm.controls.intelligence.value) +
      this.calculatePoint(this.pointByForm.controls.wisdom.value) +
      this.calculatePoint(this.pointByForm.controls.charisma.value)
    );
  }

  correctPointBy(): boolean {
    return this.pointBySum() <= 27;
  }

  calculatePoint(value: number): number {
    switch (value) {
      case 9:
        return 1;
      case 10:
        return 2;
      case 11:
        return 3;
      case 12:
        return 4;
      case 13:
        return 5;
      case 14:
        return 7;
      case 15:
        return 9;
      default:
        return 0;
    }
  }

  usePoint(point: number): boolean {
    return this.usesPoint(point) == 1;
  }

  errorPoint(point: number): boolean {
    return this.usesPoint(point) > 1;
  }

  usesPoint(point: number): number {
    let uses = 0;
    if (this.standardForm.controls.strength.value == point) {
      uses += 1;
    }
    if (this.standardForm.controls.dexterity.value == point) {
      uses += 1;
    }
    if (this.standardForm.controls.constitution.value == point) {
      uses += 1;
    }
    if (this.standardForm.controls.intelligence.value == point) {
      uses += 1;
    }
    if (this.standardForm.controls.wisdom.value == point) {
      uses += 1;
    }
    if (this.standardForm.controls.charisma.value == point) {
      uses += 1;
    }
    return uses;
  }

  correctStandard(): boolean {
    if (
      this.usePoint(15) &&
      this.usePoint(14) &&
      this.usePoint(13) &&
      this.usePoint(12) &&
      this.usePoint(10) &&
      this.usePoint(8) &&
      !this.errorPoint(15) &&
      !this.errorPoint(14) &&
      !this.errorPoint(13) &&
      !this.errorPoint(12) &&
      !this.errorPoint(10) &&
      !this.errorPoint(8)
    ) {
      return true;
    }
    return false;
  }

  get min(): number {
    if (this.standard || this.pointBy) {
      return 8;
    }
    return 0;
  }

  get max(): number {
    if (this.standard || this.pointBy) {
      return 15;
    }
    return 30;
  }

  get modificator(): Characteristics {
    if (this.standard) {
      return {
        strength: modificator(this.standardForm.controls.strength.value + this.bonus.strength),
        dexterity: modificator(this.standardForm.controls.dexterity.value + this.bonus.dexterity),
        constitution: modificator(this.standardForm.controls.constitution.value + this.bonus.constitution),
        intelligence: modificator(this.standardForm.controls.intelligence.value + this.bonus.intelligence),
        wisdom: modificator(this.standardForm.controls.wisdom.value + this.bonus.wisdom),
        charisma: modificator(this.standardForm.controls.charisma.value + this.bonus.charisma),
      };
    }
    if (this.pointBy) {
      return {
        strength: modificator(this.pointByForm.controls.strength.value + this.bonus.strength),
        dexterity: modificator(this.pointByForm.controls.dexterity.value + this.bonus.dexterity),
        constitution: modificator(this.pointByForm.controls.constitution.value + this.bonus.constitution),
        intelligence: modificator(this.pointByForm.controls.intelligence.value + this.bonus.intelligence),
        wisdom: modificator(this.pointByForm.controls.wisdom.value + this.bonus.wisdom),
        charisma: modificator(this.pointByForm.controls.charisma.value + this.bonus.charisma),
      };
    }
    if (this.custom) {
      return {
        strength: modificator(this.customForm.controls.strength.value + this.bonus.strength),
        dexterity: modificator(this.customForm.controls.dexterity.value + this.bonus.dexterity),
        constitution: modificator(this.customForm.controls.constitution.value + this.bonus.constitution),
        intelligence: modificator(this.customForm.controls.intelligence.value + this.bonus.intelligence),
        wisdom: modificator(this.customForm.controls.wisdom.value + this.bonus.wisdom),
        charisma: modificator(this.customForm.controls.charisma.value + this.bonus.charisma),
      };
    }

    return {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };
  }

  get bonus(): Characteristics {
    //TODO: взять со skills расы
    return {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    };
  }

  get strength(): string {
    if (this.standard) {
      return (this.standardForm.controls['strength'].value + this.bonus.strength).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['strength'].value + this.bonus.strength).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['strength'].value + this.bonus.strength).toString();
    }
    return '';
  }

  get dexterity(): string {
    if (this.standard) {
      return (this.standardForm.controls['dexterity'].value + this.bonus.dexterity).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['dexterity'].value + this.bonus.dexterity).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['dexterity'].value + this.bonus.dexterity).toString();
    }
    return '';
  }

  get constitution(): string {
    if (this.standard) {
      return (this.standardForm.controls['constitution'].value + this.bonus.constitution).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['constitution'].value + this.bonus.constitution).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['constitution'].value + this.bonus.constitution).toString();
    }
    return '';
  }

  get intelligence(): string {
    if (this.standard) {
      return (this.standardForm.controls['intelligence'].value + this.bonus.intelligence).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['intelligence'].value + this.bonus.intelligence).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['intelligence'].value + this.bonus.intelligence).toString();
    }
    return '';
  }

  get wisdom(): string {
    if (this.standard) {
      return (this.standardForm.controls['wisdom'].value + this.bonus.wisdom).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['wisdom'].value + this.bonus.wisdom).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['wisdom'].value + this.bonus.wisdom).toString();
    }
    return '';
  }

  get charisma(): string {
    if (this.standard) {
      return (this.standardForm.controls['charisma'].value + this.bonus.charisma).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['charisma'].value + this.bonus.charisma).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['charisma'].value + this.bonus.charisma).toString();
    }
    return '';
  }
}
