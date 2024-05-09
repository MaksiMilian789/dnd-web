import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  bonusType = new FormControl('Tasha', { nonNullable: true, validators: Validators.required });
  maxSumBonus: number = 3;

  bonusStrength = new FormControl(0, { nonNullable: true, validators: Validators.required });
  bonusDexterity = new FormControl(0, { nonNullable: true, validators: Validators.required });
  bonusConstitution = new FormControl(0, { nonNullable: true, validators: Validators.required });
  bonusIntelligence = new FormControl(0, { nonNullable: true, validators: Validators.required });
  bonusWisdom = new FormControl(0, { nonNullable: true, validators: Validators.required });
  bonusCharisma = new FormControl(0, { nonNullable: true, validators: Validators.required });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<Characteristics | null>,
    private _snackbar: MatSnackBar,
  ) {
    this.bonusType.valueChanges.subscribe((val) => {
      if (val == 'AllOne') {
        this.bonusStrength.setValue(1);
        this.bonusDexterity.setValue(1);
        this.bonusConstitution.setValue(1);
        this.bonusIntelligence.setValue(1);
        this.bonusWisdom.setValue(1);
        this.bonusCharisma.setValue(1);
        this.maxSumBonus = 6;
      }

      if (val == 'Feat') {
        this.bonusStrength.setValue(0);
        this.bonusDexterity.setValue(0);
        this.bonusConstitution.setValue(0);
        this.bonusIntelligence.setValue(0);
        this.bonusWisdom.setValue(0);
        this.bonusCharisma.setValue(0);
        _snackbar.open('Не забудьте добавить черту после создания персонажа!');
        this.maxSumBonus = 2;
      }

      if (val == 'Tasha') {
        this.bonusStrength.setValue(0);
        this.bonusDexterity.setValue(0);
        this.bonusConstitution.setValue(0);
        this.bonusIntelligence.setValue(0);
        this.bonusWisdom.setValue(0);
        this.bonusCharisma.setValue(0);
        this.maxSumBonus = 3;
      }
    });
  }

  close(): void {
    this.context.completeWith(null);
  }

  save(): void {
    let characteristics: Characteristics = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };
    characteristics = {
      strength: Number(this.strength),
      dexterity: Number(this.dexterity),
      constitution: Number(this.constitution),
      intelligence: Number(this.intelligence),
      wisdom: Number(this.wisdom),
      charisma: Number(this.charisma),
    };

    this.context.completeWith(characteristics);
  }

  readonlyBonus(): boolean {
    if (this.bonusType.value == 'AllOne') {
      return true;
    }
    return false;
  }

  bonusSum(): number{
    var sum = 0;
    sum += this.bonusStrength.value;
    sum += this.bonusDexterity.value;
    sum += this.bonusConstitution.value;
    sum += this.bonusIntelligence.value;
    sum += this.bonusWisdom.value;
    sum += this.bonusCharisma.value;
    return sum;
  }

  correctBonuses(): boolean{
    return this.bonusSum() <= this.maxSumBonus;
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
        strength: modificator(this.standardForm.controls.strength.value + this.bonusStrength.value),
        dexterity: modificator(this.standardForm.controls.dexterity.value + this.bonusDexterity.value),
        constitution: modificator(this.standardForm.controls.constitution.value + this.bonusConstitution.value),
        intelligence: modificator(this.standardForm.controls.intelligence.value + this.bonusIntelligence.value),
        wisdom: modificator(this.standardForm.controls.wisdom.value + this.bonusWisdom.value),
        charisma: modificator(this.standardForm.controls.charisma.value + this.bonusCharisma.value),
      };
    }
    if (this.pointBy) {
      return {
        strength: modificator(this.pointByForm.controls.strength.value + this.bonusStrength.value),
        dexterity: modificator(this.pointByForm.controls.dexterity.value + this.bonusDexterity.value),
        constitution: modificator(this.pointByForm.controls.constitution.value + this.bonusConstitution.value),
        intelligence: modificator(this.pointByForm.controls.intelligence.value + this.bonusIntelligence.value),
        wisdom: modificator(this.pointByForm.controls.wisdom.value + this.bonusWisdom.value),
        charisma: modificator(this.pointByForm.controls.charisma.value + this.bonusCharisma.value),
      };
    }
    if (this.custom) {
      return {
        strength: modificator(this.customForm.controls.strength.value + this.bonusStrength.value),
        dexterity: modificator(this.customForm.controls.dexterity.value + this.bonusDexterity.value),
        constitution: modificator(this.customForm.controls.constitution.value + this.bonusConstitution.value),
        intelligence: modificator(this.customForm.controls.intelligence.value + this.bonusIntelligence.value),
        wisdom: modificator(this.customForm.controls.wisdom.value + this.bonusWisdom.value),
        charisma: modificator(this.customForm.controls.charisma.value + this.bonusCharisma.value),
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

  get strength(): string {
    if (this.standard) {
      return (this.standardForm.controls['strength'].value + this.bonusStrength.value).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['strength'].value + this.bonusStrength.value).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['strength'].value + this.bonusStrength.value).toString();
    }
    return '';
  }

  get dexterity(): string {
    if (this.standard) {
      return (this.standardForm.controls['dexterity'].value + this.bonusDexterity.value).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['dexterity'].value + this.bonusDexterity.value).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['dexterity'].value + this.bonusDexterity.value).toString();
    }
    return '';
  }

  get constitution(): string {
    if (this.standard) {
      return (this.standardForm.controls['constitution'].value + this.bonusConstitution.value).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['constitution'].value + this.bonusConstitution.value).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['constitution'].value + this.bonusConstitution.value).toString();
    }
    return '';
  }

  get intelligence(): string {
    if (this.standard) {
      return (this.standardForm.controls['intelligence'].value + this.bonusIntelligence.value).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['intelligence'].value + this.bonusIntelligence.value).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['intelligence'].value + this.bonusIntelligence.value).toString();
    }
    return '';
  }

  get wisdom(): string {
    if (this.standard) {
      return (this.standardForm.controls['wisdom'].value + this.bonusWisdom.value).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['wisdom'].value + this.bonusWisdom.value).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['wisdom'].value + this.bonusWisdom.value).toString();
    }
    return '';
  }

  get charisma(): string {
    if (this.standard) {
      return (this.standardForm.controls['charisma'].value + this.bonusCharisma.value).toString();
    }
    if (this.pointBy) {
      return (this.pointByForm.controls['charisma'].value + this.bonusCharisma.value).toString();
    }
    if (this.custom) {
      return (this.customForm.controls['charisma'].value + this.bonusCharisma.value).toString();
    }
    return '';
  }
}
