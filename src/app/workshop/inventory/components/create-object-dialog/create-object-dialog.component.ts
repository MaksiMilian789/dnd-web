import { Component, Inject, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import {
  ATTACK_TYPE_LOCALIZATION,
  AttackType,
  CHARACTERISTICS_LOCALIZATION,
  CharacteristicsEnum,
  DAMAGE_TYPE_LOCALIZATION,
  DICE_LOCALIZATION,
  DamageType,
  Dice,
  ITEM_TYPE_LOCALIZATION,
  ItemType,
  RARE_LOCALIZATION,
  Rare,
  System,
} from '@core/enums';
import { Damage, DiceRoll, InventoryCreate, Skill, World } from '@core/models';
import { WorkshopService } from '@core/services/api/workshop.service';
import { AuthService } from '@core/services/auth/auth.service';
import { WorldService } from '@shared';
import { tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  SelectSkillsComponent,
  SelectSkillsComponentData,
} from 'src/app/workshop/skills/components/select-skills/select-skills.component';

@Component({
  selector: 'app-create-object-dialog',
  templateUrl: './create-object-dialog.component.html',
  styleUrl: './create-object-dialog.component.scss',
})
export class CreateObjectDialogComponent {
  form: FormGroup;
  damageForm: FormGroup;

  skills: Skill[] = [];

  worlds: Signal<World[]>;

  protected readonly damageTypes = DAMAGE_TYPE_LOCALIZATION;
  protected readonly dices = DICE_LOCALIZATION;
  protected readonly attackTypes = ATTACK_TYPE_LOCALIZATION;
  protected readonly itemTypes = ITEM_TYPE_LOCALIZATION;
  protected readonly rares = RARE_LOCALIZATION;
  protected readonly mainCharacteristics = CHARACTERISTICS_LOCALIZATION;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<boolean>,
    @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
    private _workshopService: WorkshopService,
    private _worldService: WorldService,
    private _authService: AuthService,
    private _snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      attachment: new FormControl(false, [Validators.required]),
      rare: new FormControl<Rare>(0, [Validators.required]),
      type: new FormControl<ItemType>(0, [Validators.required]),
      mainCharacteristic: new FormControl<CharacteristicsEnum>(0, [Validators.required]),
      attackType: new FormControl<AttackType>(0, [Validators.required]),
      worldId: new FormControl<number | null>(null),
    });

    this.damageForm = new FormGroup({
      flat: new FormControl(0, [Validators.required]),
      rolls: new FormControl(0, [Validators.required]),
      dice: new FormControl<Dice>(0, [Validators.required]),
      damageType: new FormControl<DamageType>(0, [Validators.required]),
      heal: new FormControl(false, [Validators.required]),
    });

    this.worlds = toSignal(this._worldService.loadShortWorlds(this._authService.currentUser?.id!), {
      initialValue: [],
    });
  }

  create(): void {
    let skillIds: number[] = this.skills.map((x) => x.id);
    let damage: Damage = new Damage();

    if (this.form.controls['attackType'].value != AttackType.NotWeapon) {
      const val = this.damageForm;
      let damageRoll: DiceRoll = new DiceRoll();
      damageRoll.dice = Number(val.controls['dice'].value);
      damageRoll.rolls = val.controls['rolls'].value;

      damage.damageRoll = damageRoll;
      damage.damageType = val.controls['damageType'].value;
      damage.flat = val.controls['flat'].value;
      damage.heal = val.controls['heal'].value;
    }

    const dto: InventoryCreate = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      damage: damage,
      attackType: Number(this.form.controls['attackType'].value),
      attachment: this.form.controls['attachment'].value,
      rare: Number(this.form.controls['rare'].value),
      type: Number(this.form.controls['type'].value),
      mainCharacteristic: Number(this.form.controls['mainCharacteristic'].value),
      system: System.Dnd,
      authorId: this._authService.currentUser?.id!,
      worldId: this.form.controls['worldId'].value ?? null,
      skillIds: skillIds,
    };
    this._workshopService.createInventoryObject(dto).subscribe(() => {
      this._snackbar.open('Создание успешно.');
      this.context.completeWith(true);
    });
  }

  addSkills(): void {
    const data: SelectSkillsComponentData = {
      skills: this.skills,
      onlyPassvie: false,
      forCreateCharacter: false
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

  hasDamage(): boolean {
    return this.form.controls['attackType'].value != AttackType.NotWeapon;
  }

  close(): void {
    this.context.completeWith(false);
  }

  @tuiPure
  protected stringifyWorld(): TuiStringHandler<number> {
    return (value: number) => this.worlds().find((x) => x.id == value)?.name || '';
  }

  @tuiPure
  protected stringifyDamageType(): TuiStringHandler<DamageType> {
    return (value: DamageType) => DAMAGE_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyDice(): TuiStringHandler<Dice> {
    return (value: Dice) => DICE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyAttackType(): TuiStringHandler<AttackType> {
    return (value: AttackType) => ATTACK_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyItemType(): TuiStringHandler<ItemType> {
    return (value: ItemType) => ITEM_TYPE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyRare(): TuiStringHandler<Rare> {
    return (value: Rare) => RARE_LOCALIZATION[value] || '';
  }

  @tuiPure
  protected stringifyCharacteristics(): TuiStringHandler<CharacteristicsEnum> {
    return (value: CharacteristicsEnum) => CHARACTERISTICS_LOCALIZATION[value] || '';
  }

  stopSort() {
    return 0;
  }
}
