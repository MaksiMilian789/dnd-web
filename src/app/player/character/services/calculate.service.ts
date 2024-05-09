import { Injectable } from '@angular/core';
import { ItemType, SkillType } from '@core/enums';
import { Inventory, Skill } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  visions = ['Обычное', 'Тёмное', 'Видение сквозь маг тьму', 'Видение невидимых', 'Слепое', 'Истинное'];

  calculateEffectValue(skillType: SkillType, skills: Skill[], masterBonus: number, value?: number): number {
    let flat = 0;
    let isFlat = false;
    let dynamic = 0;
    let isMastery = false;
    let isCompetent = false;
    skills.forEach((skill) => {
      if (skill.skillType == skillType) {
        let effect = skill.value.effect;
        if (effect.flat != 0) {
          isFlat = true;
          if (effect.flat > flat || flat == 0) {
            flat = effect.flat;
          }
        }

        if (effect.dynamic != 0) {
          dynamic += effect.dynamic;
        }

        if (effect.mastery) {
          isMastery = true;
        }

        if (effect.competent) {
          isCompetent = true;
        }
      }
    });

    if (isCompetent) {
      dynamic += masterBonus * 2;
    } else if (isMastery) {
      dynamic += masterBonus;
    }

    if (value) {
      dynamic += value;
    }

    return isFlat ? flat : dynamic;
  }

  calculateEffectSaveRoll(skillType: SkillType, skills: Skill[], masterBonus: number, value?: number): number {
    let flat = 0;
    let isFlat = false;
    let dynamic = 0;
    let isMastery = false;
    let isCompetent = false;
    skills.forEach((skill) => {
      let effect = skill.value.effect;
      if (!effect.saveRoll) {
        return;
      }

      if (skill.skillType == skillType) {
        if (effect.flat != 0) {
          isFlat = true;
          if (effect.flat > flat || flat == 0) {
            flat = effect.flat;
          }
        }

        if (effect.dynamic != 0) {
          dynamic += effect.dynamic;
        }

        if (effect.mastery) {
          isMastery = true;
        }

        if (effect.competent) {
          isCompetent = true;
        }
      }
    });

    if (isCompetent) {
      dynamic += masterBonus * 2;
    } else if (isMastery) {
      dynamic += masterBonus;
    }

    if (value) {
      dynamic += value;
    }

    return isFlat ? flat : dynamic;
  }

  calculateMasteryBonus(level: number): number {
    return Math.ceil(level / 4 + 1);
  }

  calculateArmor(skills: Skill[], dexterityMdf: number, objectInstance: Inventory[]): number {
    let flat = 0;
    let dynamic = 0;
    let useArmor = false;
    skills.forEach((element) => {
      if (element.skillType == SkillType.ClassArmor) {
        let effect = element.value.effect;

        if (effect.flat != 0) {
          useArmor = true;
          if (effect.flat > flat || flat == 0) {
            flat = effect.flat;
          }
        }

        if (effect.dynamic != 0) {
          dynamic += effect.dynamic;
        }
      }
    });

    let armorType: ItemType | null = null;
    objectInstance.forEach((element) => {
      element.skillInstances.forEach((skill) => {
        if (skill.skillType == SkillType.ClassArmor && skill.value.effect.flat == flat) {
          armorType = element.type;
        }
      });
    });

    let bonus = 0;
    if (armorType) {
      if (armorType == ItemType.LightArmor) {
        bonus = dexterityMdf;
      }
      if (armorType == ItemType.MediumArmor) {
        bonus = dexterityMdf > 2 ? 2 : dexterityMdf;
      }
    }

    if (useArmor) {
      return flat + dynamic + bonus;
    }

    return 8 + dexterityMdf;
  }

  calculatePriorityVision(skills: Skill[]): string {
    let vision = 'Обычное';
    skills.forEach((element) => {
      if (element.skillType == SkillType.Vision) {
        let v = element.value.typeVision.name;
        if (this.visions.includes(v)) {
          if (this.visions.findIndex((x) => vision) < this.visions.findIndex((x) => v)) {
            vision = v;
          }
        }
      }
    });
    return vision;
  }

  // TODO
  calculateVisions(skills: Skill[]): string[] {
    return [];
  }

  // TODO
  calculatePassivePersption(skills: Skill[], perseprionMdf: number): number {
    return 0;
  }

  calculateMaxHp(level: number, skills: Skill[], constitutionMdf: number): number {
    let hpPerLevel = 0;
    let dynamic = 0;
    let isFixHp = false;
    let fixHp = 0;
    skills.forEach((skill) => {
      let effect = skill.value.effect;
      let perLevel = skill.value.perLevel;
      if (skill.skillType == SkillType.Hp) {
        hpPerLevel = perLevel.flat;
      }

      if (skill.skillType == SkillType.MaxHp) {
        if (effect.flat != 0) {
          isFixHp = true;
          if (effect.flat > fixHp || fixHp == 0) {
            fixHp = effect.flat;
          }
        }

        if (effect.dynamic != 0) {
          dynamic += effect.dynamic;
        }
      }
    });

    if (isFixHp) {
      return fixHp > 0 ? fixHp : 0;
    }

    let hp = level * (hpPerLevel + constitutionMdf) + dynamic;
    return hp > 0 ? hp : 0;
  }
}
