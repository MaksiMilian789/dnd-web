import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statsSkill',
})
export class StatsSkill implements PipeTransform {
  transform(stat: number, bonus: number): number {
    switch (stat) {
      case 0:
      case 1:
        return -5 + bonus;
      case 2:
      case 3:
        return -4 + bonus;
      case 4:
      case 5:
        return -3 + bonus;
      case 6:
      case 7:
        return -2 + bonus;
      case 8:
      case 9:
        return -1 + bonus;
      case 10:
      case 11:
        return 0 + bonus;
      case 12:
      case 13:
        return 1 + bonus;
      case 14:
      case 15:
        return 2 + bonus;
      case 16:
      case 17:
        return 3 + bonus;
      case 18:
      case 19:
        return 4 + bonus;
      case 20:
      case 21:
        return 5 + bonus;
      case 22:
      case 23:
        return 6 + bonus;
      case 24:
      case 25:
        return 7 + bonus;
      case 26:
      case 27:
        return 8 + bonus;
      case 28:
      case 29:
        return 9 + bonus;
      case 30:
        return 10 + bonus;
      default:
        return bonus;
    }
  }
}
